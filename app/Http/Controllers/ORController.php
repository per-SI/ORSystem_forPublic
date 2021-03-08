<?php


namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request ;
use Illuminate\Http\File ;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;

class ORController extends Controller{

    public function index(){
        $shoplist = DB::select("SELECT shop FROM shoplist ;");
        $shopList = array();
        foreach($shoplist as $shop){
            $shopList[] = (array)$shop ;
        }
        return view('index',compact("shopList"));
    }

    public function newWall(){
        $shoplist = DB::select("SELECT shop FROM shoplist ;");
        $shopList = array();
        foreach($shoplist as $shop){
            $shopList[] = (array)$shop ;
        }
        return view('newWall',compact("shopList"));
    }

    public function createNewWall(Request $request){
        DB::enableQueryLog();

        $shop = $request->input("shopSelected");
        if( $shop === "notSelected" ){
            $shop = $request->input('shopName');
            Schema::create($shop.'_items',function(Blueprint $table){
                $table->integer('code');
                $table->string('wall',50);
                $table->integer('y');
                $table->integer('x');
                $table->unique(['wall','y','x']);
            });
            DB::statement("INSERT INTO shoplist(shop) VALUE(?);",[$shop]);
        }
        $wall = $request->input('wallName');
        $row = $request->input('QofRow');
        $column = $request->input('QofColumn');

        $insertValue = "";
        for( $i=1; $i<=$row; ++$i){
            for( $j=1; $j<=$column; ++$j ){
                $insertValue .= "(-1,'".$wall."'".",".$i.",".$j.")," ;
            }
        }

        $insertValue = mb_substr($insertValue,0,-1);
        $statement = "INSERT INTO ".$shop."_items"."(code,wall,y,x) VALUE".$insertValue.";" ;
        DB::insert($statement);

        $query = DB::getQueryLog();
        return $this->showWall($shop);
    }

    public function sample(Request $request){
        DB::enableQueryLog();

        DB::insert('INSERT INTO sample(sample) VALUE(:input) ;',[$request->input('sample')]);

        $query = DB::getQueryLog();
        $datas = DB::select('SELECT * FROM sample ');
        $arr = array();
        forEach($datas as $data){
            $arr[] = (array)$data;
        }
        $id_array = array();
        forEach($arr as $ar){
            $id_array[] = $ar["id"];
        }
        array_multisort($id_array,SORT_DESC,SORT_NUMERIC,$arr);
        dd($query,DB::select('SELECT * FROM sample '),$arr/*WHERE id=:id',['id'=>$request->input('sample')]))*/);
    }

    public function showWall($shop){
        $shopName = $shop."_items";
        $query = "SELECT y,x,".$shopName.".code,number,gazou FROM ".$shopName." LEFT JOIN items on ".$shopName.".code = items.code WHERE wall ='new';";
        $newitems = DB::select($query);

        $new = array();
        $k = count($newitems);
        for( $i=0; $i<$k; ++$i ){
            $new[] = (array)$newitems[$i] ;
        }

        //取得した多次元配列をSORT
        if($new!==[]){
            $x_array = array(); $y_array = array();
            foreach($new as $data){
                $x_array[] = $data['x'] ;
                $y_array[] = $data['y'] ;
            }
            array_multisort($y_array, SORT_ASC, SORT_NUMERIC,$x_array, SORT_ASC, SORT_NUMERIC, $new);
        }

        //wallListの取得
        $query = "SELECT wall FROM ".$shop."_walls";
        $walllist = DB::select($query);
        $l = count($walllist);
        $wallList = array();
        for( $i=0; $i<$l; ++$i ){
            $wallList[] = $walllist[$i]->wall;
        }

        return view("orderAndreplace",compact("shop","new","wallList"));

    }

    public function getStickerInfo($numbers){
        $query = "SELECT number,code,gazou,sort FROM items WHERE number in(".$numbers.");";
        $code = DB::select($query);
        echo json_encode($code);
    }

    public function moveWall($shop,$wall){
        $shopName = $shop."_items";
        $query = "SELECT y,x,".$shopName.".code,number,gazou FROM ".$shopName." LEFT JOIN items on ".$shopName.".code = items.code WHERE wall ='".$wall."';";
        $items = DB::select($query);
        $main = array();
        $j = count($items);
        for( $i=0; $i<$j; ++$i ){
                $main[] = (array)$items[$i] ;
        }

        $query = "SELECT max(y) as 'rowLength' FROM ".$shopName." WHERE wall='".$wall."';";
        $rowlen = DB::select($query);
        $rowLength = (array)$rowlen[0] ;
        $query = "SELECT max(x) as 'columnLength' FROM ".$shopName." WHERE wall='".$wall."';" ;
        $columnlen = DB::select($query);
        $columnLength = (array)$columnlen[0];

        $arrayForSend[0] = $main ;
        $arrayForSend[1] = $rowLength ;
        $arrayForSend[2] = $columnLength ;

        header('Content-Type: application/javascript; charset=utf-8');
        echo json_encode($arrayForSend);

    }

    public function replace($shop,$wall,$X,$Y,$codes,$ncodes){
        $Q = array();
        if($codes !== "nothing"){

            $X = explode(",",$X);
            $Y = explode(",",$Y);
            $code = explode(",",$codes);
            $j = count($code);

            $query = "UPDATE ".$shop."_items SET code= CASE";
            for( $i=0; $i<$j; ++$i ){
                $query .= " WHEN x=".$X[$i]." AND y=".$Y[$i]." THEN ".$code[$i] ;
            }
            $query .= " ELSE code END WHERE wall='".$wall."';" ;
            $Q[] = $query;
            DB::update($query);

        }

        if($ncodes !== "nothing"){
            $ncode = explode(",",$ncodes);
            $j = count($ncode);

            $nquery = "UPDATE ".$shop."_items set code= CASE";
            for( $i=0; $i<$j; ++$i ){
                $nquery .= " WHEN y=".($i+1)." THEN ".$ncode[$i] ;
            }
            $nquery .= " ELSE code END WHERE wall='new';" ;

            DB::update($nquery);
            $Q[] = $nquery;
        }

        $deleteQuery = "DELETE FROM ".$shop."_items WHERE wall='".$wall."_t';" ;
        DB::delete($deleteQuery);

        $deleteQuery2 = "DELETE FROM ".$shop."_items WHERE wall='".$wall."_t_sub';" ;
        DB::delete($deleteQuery2);

        echo json_encode($Q);

    }

    public function saveTemporary($shop,$wall,$X,$Y,$codes,$ncodes,$scodes){
        $Q = array();

        $deleteQuery = "DELETE FROM ".$shop."_items WHERE wall='".$wall."_t';" ;
        DB::delete($deleteQuery);
        if($codes !== "nothing"){

            $X = explode(",",$X);
            $Y = explode(",",$Y);
            $code = explode(",",$codes);
            $j = count($code);
            $query = "INSERT INTO ".$shop."_items(code,wall,x,y) VALUE";
            for( $i=0; $i<$j; ++$i ){
                $query .= "(".$code[$i].",'".$wall."_t',".$X[$i].",".$Y[$i]."),";
            }
            $query = mb_substr($query,0,-1);
            $query .= ";";
            DB::insert($query);
            $Q[] = $query;
        }

        if($ncodes !== "nothing"){
            $ncode = explode(",",$ncodes);
            $j = count($ncode);

            $nquery = "UPDATE ".$shop."_items set code= CASE";
            for( $i=0; $i<$j; ++$i ){
                $nquery .= " WHEN y=".($i+1)." THEN ".$ncode[$i] ;
            }
            $nquery .= " ELSE code END WHERE wall='new';" ;

            DB::update($nquery);
            $Q[] = $nquery;
        }

        $deleteQuery2 = "DELETE FROM ".$shop."_items WHERE wall='".$wall."_t_sub';" ;
        DB::delete($deleteQuery2);
        if($scodes !== "nothing"){

            $scodes = explode(",",$scodes);
            $j = count($scodes);
            $query =  "INSERT INTO ".$shop."_items(code,wall,x,y) VALUE";
            for( $i=0; $i<$j; ++$i ){
                $query .= "(".$scodes[$i].",'".$wall."_t_sub',".($i+1).",1001),";
            }
            $query = mb_substr($query,0,-1);
            $query .= ";";
            DB::insert($query);
            $Q[] = $query;

        }

        echo json_encode($Q);
    }

    public function readTemporary($shop,$wall){
        $arrayForSend = array();

        $shopName = $shop."_items";
        $query = "SELECT y,x,".$shopName.".code,number,gazou FROM ".$shopName." LEFT JOIN items on ".$shopName.".code = items.code WHERE wall='".$wall."_t';";
        $items = DB::select($query);
        $main = array();
        $j = count($items);
        for( $i=0; $i<$j; ++$i ){
                $main[] = (array)$items[$i] ;
        }

        $query = "SELECT y,x,".$shopName.".code,number,gazou FROM ".$shopName." LEFT JOIN items on ".$shopName.".code = items.code WHERE wall ='".$wall."_t_sub';";
        $subitems = DB::select($query);

        $sub = array();
        $k = count($subitems);
        for( $i=0; $i<$k; ++$i ){
            $sub[] = (array)$subitems[$i] ;
        }

        $query = "SELECT max(y) as 'rowLength' FROM ".$shopName." WHERE wall='".$wall."_t';";
        $rowlen = DB::select($query);
        $rowLength = (array)$rowlen[0] ;
        $query = "SELECT max(x) as 'columnLength' FROM ".$shopName." WHERE wall='".$wall."_t';" ;
        $columnlen = DB::select($query);
        $columnLength = (array)$columnlen[0];



        $arrayForSend[0] = $main ;
        $arrayForSend[1] = $sub ;
        $arrayForSend[2] = $rowLength ;
        $arrayForSend[3] = $columnLength ;

        echo json_encode($arrayForSend);

    }

    public function Layout($shop, $wall){
        $shopName = $shop."_items";
        $query = "SELECT y,x,".$shopName.".code,number,gazou FROM ".$shopName." LEFT JOIN items on ".$shopName.".code = items.code WHERE wall ='".$wall."';";
        $items = DB::select($query);
        $main = array();
        $j = count($items);
        for( $i=0; $i<$j; ++$i ){
                $main[] = (array)$items[$i] ;
        }

        //取得した多次元配列をSORT
        $x_array = array(); $y_array = array();
        foreach($main as $data){
            $x_array[] = $data['x'] ;
            $y_array[] = $data['y'] ;
        }
        array_multisort($y_array, SORT_ASC, SORT_NUMERIC,$x_array, SORT_ASC, SORT_NUMERIC, $main);

        $query = "SELECT max(y) FROM ".$shopName." WHERE wall='".$wall."';";
        $rowlen = DB::select($query);
        $rowLength = (array)$rowlen[0] ;
        $query = "SELECT max(x),y FROM ".$shopName." WHERE wall='".$wall."' GROUP BY y;" ;
        $columnlen = DB::select($query);
        $columnLength = array();
        $h = count($columnlen);
        for($i=0; $i<$h; ++$i){
            $columnLength[] = (array)$columnlen[$i] ;
        }

        return view('Layout',compact('main','shop','wall','rowLength','columnLength'));
    }

    public function changeLayout(Request $request, $shop, $wall, $rowLength, $columnLength, $topNew, $bottomNew, $leftNew, $rightNew, $topDel, $bottomDel, $leftDel, $rightDel){

        if( $request->input('wallNewName')){
            $newWall = $request->input('wallNewName');
            $checkQuery = "SELECT wall FROM ".$shop."_items WHERE wall='".$newWall."';";
            $result = DB::select($checkQuery);
            if( !$result ){
                $changeNameQuery = "UPDATE ".$shop."_items SET wall='".$newWall."' WHERE wall='".$wall."';";
                DB::update($changeNameQuery);
                $wall = $newWall;
            }else{
                echo '※同じ名前の面があるため、名前は変更できませんでした。' ;
            }
        }

        $a = $topNew + $topDel ; //空白行の追加数（上）※topNewは行（上）の増減を表す。
        $b = $bottomNew + $bottomDel ; //空白行の追加数（下）
        $c = $leftNew + $leftDel ; //空白列の追加数（左）
        $d = $rightNew + $rightDel ; //空白列の追加数（右）

        //指定の行と列を削除する
        if( $leftDel>0 || $rightDel>0 || $topDel>0 || $bottomDel>0 ){

            $deColumnNum = "";
            if($leftDel>0){
                for( $i=1; $i<=$leftDel; ++$i ){
                $deColumnNum .= "$i,";
                }
            }
            if($rightDel>0){
                for( $i=0; $i<$rightDel; ++$i ){
                    $j = $columnLength-$i ;
                    $deColumnNum .= "$j,";
                }
            }
            $deColumnNum = mb_substr($deColumnNum,0,-1);

            $deRowNum = "";
            if($topDel>0){
                for( $i=1; $i<=$topDel; ++$i ){
                    $deRowNum .= "$i,";
                }
            }
            if($bottomDel>0){
                for( $i=0; $i<$bottomDel; ++$i ){
                    $j = $rowLength-$i ;
                    $deRowNum .= "$j,";
                }
            }
            $deRowNum = mb_substr($deRowNum,0,-1);

            if( $deColumnNum !== "" && $deRowNum !== "" ){
                $DRCquery = "DELETE FROM ".$shop."_items WHERE wall='".$wall."' AND ( y in(".$deRowNum.") OR x in(".$deColumnNum.") );" ;
                DB::delete($DRCquery);
            }elseif( $deColumnNum !== "" ){
                $DRCquery = "DELETE FROM ".$shop."_items WHERE wall='".$wall."' AND x in(".$deColumnNum.");" ;
                DB::delete($DRCquery);
            }elseif( $deRowNum !== "" ){
                $DRCquery = "DELETE FROM ".$shop."_items WHERE wall='".$wall."' AND y in(".$deRowNum.");" ;
                DB::delete($DRCquery);
            }

        }

        //既存のx,yを新しいx,yに更新する

        if( $topNew != 0 || $leftNew != 0 ){
            $URCquery = "UPDATE ".$shop."_items SET y=y+".$topNew.",x=x+".$leftNew." WHERE wall='".$wall."';";
            DB::update($URCquery);
        }

        //新行または新列が追加されている場合、挿入する

        if( $topNew + $topDel>0 || $bottomNew + $bottomDel>0 || $leftNew + $leftDel>0 || $rightNew + $rightDel>0 ){

            $newRowLength = $rowLength + $topNew + $bottomNew ;
            $newColumnLength = $columnLength + $leftNew + $rightNew ;

            $insertQuery = "INSERT INTO ".$shop."_items(code,wall,y,x) VALUE";

            if( $topNew + $topDel>0 ){
                $n = $topNew+$topDel ;
                for( $i=1; $i<=$n; ++$i ){
                    for( $j=1; $j<=$newColumnLength; ++$j ){
                        $insertQuery .= "(-1,'".$wall."',".$i.",".$j.")," ;
                    }
                }
            }

            if( $bottomNew + $bottomDel>0 ){
                $n = $rowLength + $topNew - $bottomDel + 1 ;
                $m = $n - 1 + $bottomNew + $bottomDel ;
                for( $i=$n; $i<=$m; ++$i ){
                    for( $j=1; $j<=$newColumnLength; ++$j ){
                        $insertQuery .= "(-1,'".$wall."',".$i.",".$j.")," ;
                    }
                }
            }

            if( $leftNew + $leftDel>0 ){
                $k = $leftNew + $leftDel ;
                if( $topNew + $topDel>0 ){
                    $n = $topNew + $topDel + 1 ;
                    $m = $n - 1 + $rowLength - $topDel - $bottomDel;
                    for( $i=$n; $i<=$m; ++$i ){
                        for( $j=1; $j<=$k; ++$j ){
                            $insertQuery .= "(-1,'".$wall."',".$i.",".$j.")," ;
                        }
                    }
                }else{
                    $n = 1 ;
                    $m = $rowLength-$topDel-$bottomDel;
                    for( $i=$n; $i<=$m; ++$i ){
                        for($j=1; $j<=$k; ++$j ){
                            $insertQuery .= "(-1,'".$wall."',".$i.",".$j.")," ;
                        }
                    }
                }
            }

            if( $rightNew + $rightDel>0 ){
                $k = $columnLength + $leftNew - $rightDel + 1;
                $l = $k - 1 + $rightNew + $rightDel ;
                if( $topNew + $topDel>0 ){
                    $n = $topNew + $topDel + 1 ;
                    $m = $n - 1 + $rowLength - $topDel - $bottomDel;
                    for( $i=$n; $i<=$m; ++$i ){
                        for($j=$k; $j<=$l; ++$j ){
                            $insertQuery .= "(-1,'".$wall."',".$i.",".$j.")," ;
                        }
                    }
                }else{
                    $n = 1 ;
                    $m = $rowLength-$topDel-$bottomDel;
                    for( $i=$n; $i<=$m; ++$i ){
                        for($j=$k; $j<=$l; ++$j ){
                            $insertQuery .= "(-1,'".$wall."',".$i.",".$j.")," ;
                        }
                    }
                }
            }

            $insertQuery = mb_substr($insertQuery,0,-1).";";
            DB::insert($insertQuery);

        }

        $Hx = explode(',',$request->input('Hx'));
        $Hy = explode(',',$request->input('Hy'));
        $Sx = explode(',',$request->input('Sx'));
        $Sy = explode(',',$request->input('Sy'));

        if($Hx[0]!=="" || $Sx[0]!==""){

            $changeHSquery = "UPDATE ".$shop."_items SET code= CASE";
            if($Hx[0]!==""){
                $j = count($Hx);
                for( $i=0; $i<$j; ++$i ){
                    $changeHSquery .= " WHEN x=".$Hx[$i]." AND y=".$Hy[$i]." THEN -2" ;
                }
            }
            if($Sx[0]!==""){
                $j = count($Sx);
                for( $i=0; $i<$j; ++$i ){
                    $changeHSquery .= " WHEN x=".$Sx[$i]." AND y=".$Sy[$i]." THEN -1" ;
                }
            }
            $changeHSquery .= " ELSE code END WHERE wall='".$wall."';" ;
            DB::update($changeHSquery);

        }

        return $this->Layout($shop, $wall);

    }

    public function newStickers($shop){

    }

    public function registerPage(){

        $data = DB::select('SELECT * FROM items');

        $code = array();
        $name = array();
        $number = array();
        $gazou = array();

        for( $i=0; $i<count($data); $i++ ){
            $code[] = $data[$i]->code;
            $name[] = $data[$i]->name;
            $number[] = $data[$i]->number;
            $gazou[] = $data[$i]->gazou;
        }
        return view('register',compact('code','name','number','gazou'));
    }

    public function upload(Request $request){
        $uploadfiles = $request->file('files');
        $uploadNames = $request->input('stickerName');
        $uploadNumbers = $request->input('stickerNumber');
        $uploadGazous = $request->input('stickerGazou');

        for( $i=0; $i<count($uploadfiles); $i++ ){

            DB::insert('INSERT INTO items(number,name,gazou) VALUE(:number,:name,:gazou);',['number'=>$uploadNumbers[$i],'name'=>$uploadNames[$i],'gazou'=>$uploadGazous[$i]]);



            Storage::putFileAs('public/img/',$uploadfiles[$i],$uploadGazous[$i]);

//            $j = $i+1+$newItemLength;
//            Storage::put('txtForWall/'.$shop.'/newStickers'.'/item'.$j.'.txt',$j.','.$j.','.$uploadNames[$i].','.$uploadNames[$i].'.'.$uploadfiles[$i]->extension());
        }

        $database = DB::select('SELECT * FROM items');

        dd($request->input('stickerName'),$request->file('files'),$database);
    }

    public function delete(Request $request, $shop){
        $pathOfNew = 'txtForWall/'.$shop.'/newStickers';
        $itemLen = count(Storage::files($pathOfNew));

        $num = $request->input('deleteNum');
        for( $i=0; $i<count($num); $i++ ){
            Storage::delete($pathOfNew.'/item'.$num[$i].'.txt');
        }
        $item = array();
        for( $i=0; $i<$itemLen; $i++ ){
            $j=$i+1;
            if(Storage::exists($pathOfNew.'/item'.$j.'.txt')){
                $item[] = $pathOfNew.'/item'.$j.'.txt';
                echo $j;
            }
        }
        for( $i=0; $i<count($item); $i++ ){
            $j=$i+1;
            if( $item[$i] !== $pathOfNew.'/item'.$j.'.txt' ){
                Storage::move($item[$i], $pathOfNew.'/item'.$j.'.txt');
            }
        }

        dd($request->input('deleteNum'),$num);
    }

    public function modalOpen($number){
        $query = "SELECT code,gazou FROM items WHERE number='".$number."';";
        $stickerInfo = DB::select($query);
        header('Content-Type: application/javascript; charset=utf-8');
        echo json_encode($stickerInfo) ;
    }

    public function serch($word){
        $items = DB::select('SELECT * FROM items WHERE (name LIKE :word OR number LIKE :word2) AND sort=1 ;',['word'=>"%$word%",'word2'=>"%$word%"]);

        header('Content-Type: application/javascript; charset=utf-8');
        echo json_encode($items);
    }

    public function addNewStickers($shop, $codes, $numbers){
        $query = "SELECT max(y)+1 as num FROM ".$shop."_items WHERE wall='new';";
        $startNumber = DB::select($query)[0]->num;
        if(mb_substr_count($codes,",")>0){

            $code = explode(',',$codes);
            $j = count($code);
            $query = "INSERT INTO ".$shop."_items(code,wall,y,x) VALUE";
            for( $i=0; $i<$j; $i++ ){
                $y = $startNumber+$i ;
                $query .= "(".$code[$i].",'new',".$y.",1001),";
            }
            $query = mb_substr($query,0,-1) ;
            $query .= ";" ;

        }else{
            $query = "INSERT INTO ".$shop."_items(code,wall,y,x) VALUE(".$codes.",'new',".$startNumber.",1001) ;";
        }

        DB::insert($query);

        return $this->getStickerInfo($numbers);

    }

    public function deleteNewStickers($shop,$YtoD,$YtoS){
        $query = "DELETE FROM ".$shop."_items WHERE wall='new' AND (" ;
        if(mb_substr_count($YtoD,",")==0){
            $query = "DELETE FROM ".$shop."_items WHERE wall='new' AND y=".$YtoD ;
        }else{
            $YtoD = explode(',',$YtoD);
            $j = count($YtoD);
            for( $i=0; $i<$j; ++$i ){
                if($i<$j-1){
                    $query .= "y=".$YtoD[$i]." OR " ;
                }else{
                    $query .= "y=".$YtoD[$i].");";
                }
            }
        }
        DB::delete($query);

        $query = "UPDATE ".$shop."_items SET y= CASE ";
        if(mb_substr_count($YtoS,",")>=1){
            $YtoS = explode(',',$YtoS);
            $j = count($YtoS) ;
            for( $i=0; $i<$j; ++$i ){
                $h = $i+1 ;
                $query .= " WHEN y=".$YtoS[$i]." THEN ".$h ;
            }
            $query .= " ELSE y END WHERE wall='new';";
        }else{
            $query = "UPDATE ".$shop."_items SET y=1 WHERE wall='new' ;";
        }
        DB::update($query);

        echo "UpdateNewStickers";
    }

    function showSheetList($shop){
        $query = "SELECT id FROM shoplist WEHER shop='".$shop."';";
        $shopID = DB::select($query);
        $query = "SELECT code,CAST(date AS DATE) AS 'date',order_shop,delivery_date,delivery_method,note FROM order_sheet WHERE order_shop=".$shopID." ORDER BY code DESC LIMIT 50;";
        $sheetsInfo = DB::select($query);
        echo json_encode($sheetsInfo);
    }

    function createSheet(Request $request, $shop,$date,$method,$source,$comment){
        if(!$comment == "nocomment"){
            $comment = urldecode($comment);
        }else{
            $comment = "コメントなし";
        }
        $query = "SELECT id FROM shoplist WEHER shop='".$shop."';";
        $shopID = DB::select($query);
        $query = "INSERT INTO order_sheet(date, order_staff, order_shop, delivery_method, delivery_date, note) VALUE(NOW(), ".$request->user()->id.", ".$shopID.", '".$method."', '".$date."', '".$comment."');";
        DB::insert($query);
        $query = "SELECT max(code) AS 'code' FROM order_sheet ;";
        $code = DB::select($query);
        echo json_encode($code);
    }

    function selectSheet($code){
        $query = "SELECT code_product,name,quantity,number,sort FROM order_items LEFT JOIN items on items.code = code_product WHERE code_sales=".$code." ;";
        $CodeQuantity = DB::select($query);
        echo json_encode($CodeQuantity);
    }


    public function order($sheetNum,$pCode,$quantity){

        if($quantity !== "-"){
            $query = "INSERT INTO order_items(code_sales,code_product,quantity) VALUE(".$sheetNum.",".$pCode.",".$quantity.") ON DUPLICATE KEY UPDATE quantity=values(quantity) ;";
            DB::insert($query);
            echo $query;
        }else{
            $query = "DELETE FROM order_items WHERE code_sales=".$sheetNum." AND code_product=".$pCode.";" ;
            DB::insert($query);
            echo $query;
        }

    }

    public function getStickerRanking($startDate,$endDate){
        //SELECT code_product,sum(quantity),DENSE_RANK() OVER(ORDER BY sum(quantity) DESC) AS rank FROM order_items WHERE code_sales>1 GROUP BY code_product ORDER BY sum(quantity) DESC;

        //SELECT code_product,sum(quantity),DENSE_RANK() OVER(ORDER BY sum(quantity) DESC) FROM order_items LEFT JOIN order_sheet on order_sheet.code=code_sales WHERE date>"2020-12-27" AND date<"2021-01-10 00:33:00" GROUP BY code_product ORDER BY sum(quantity) DESC;

        //SELECT number,sort,sum(quantity),DENSE_RANK() OVER(ORDER BY sum(quantity) DESC)FROM order_items LEFT JOIN order_sheet ON order_sheet.code = code_sales RIGHT JOIN items ON items.code = code_product WHERE date>"2020-12-27" AND date<"2021-01-10 00:33:00" GROUP BY number ORDER BY sum(quantity);

        $query="SELECT number,sum(quantity),DENSE_RANK() OVER(ORDER BY sum(quantity) DESC) AS rank FROM order_items LEFT JOIN order_sheet ON order_sheet.code = code_sales RIGHT JOIN items ON items.code = code_product WHERE date > '".$startDate."' AND date < '".$endDate."' GROUP BY number ORDER BY sum(quantity);";
        $rankData = DB::select($query);
        echo json_encode($rankData);
    }

    public function test_post(Request $request){
        $arr = [$request->user(), $request->name,$request->user()->name,$request->cookie()];
        echo json_encode($arr);
    }
}
