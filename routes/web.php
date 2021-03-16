<?php

use Illuminate\Support\Facades\Route;
/*
Route::get('/', function(){
    return view('app');
})->where('any', '.*');*/

Auth::routes();

Route::group(['middleware'=>'auth'],function(){
    /*Route::get('/',function () {
        return view('welcome');
    });*/
    Route::get('/','App\Http\Controllers\ORController@index');
    Route::get('/orderandreplace/{shop}','App\Http\Controllers\ORController@showWall');
});

Route::get('/top',function(){
    return view('app');
});

Route::get('/newWall','App\Http\Controllers\ORController@newWall');

Route::post('/createNewWall','App\Http\Controllers\ORController@createNewWall');

Route::post('/sample','App\Http\Controllers\ORController@sample');


Route::get('/readData/{numbers}','App\Http\Controllers\ORController@getStickerInfo');

Route::get('/modalOpen/{number}','App\Http\Controllers\ORController@modalOpen');

Route::get('/shop/{shop}/{wallNum}','App\Http\Controllers\ORController@giveData');

Route::get('/replace/{shop}/{wall}/{X}/{Y}/{codes}/{ncodes}','App\Http\Controllers\ORController@replace');

Route::get('/Layout/{shop}/{wall}','App\Http\Controllers\ORController@Layout');

Route::post('/saveLayout/{shop}/{wall}/{rowLength}/{bottomLength}/{topNew}/{bottomNew}/{leftNew}/{rightNew}/{topDel}/{bottomDel}/{leftDel}/{rightDel}','App\Http\Controllers\ORController@changeLayout');

Route::get('/newStickers/{shop}','App\Http\Controllers\ORController@newStickers');

Route::get('/registerPage','App\Http\Controllers\ORController@registerPage');

Route::post('/upload','App\Http\Controllers\ORController@upload');

Route::post('/delete','App\Http\Controllers\ORController@delete');

Route::get('/order/{sheetNum}/{pCode}/{quantity}','App\Http\Controllers\ORController@order');

Route::get('/saveTemporary/{shop}/{wall}/{X}/{Y}/{codes}/{ncodes}/{scodes}','App\Http\Controllers\ORController@saveTemporary');

Route::get('/readTemporary/{shop}/{wall}','App\Http\Controllers\ORController@readTemporary');

Route::get('/search/{word}','App\Http\Controllers\ORController@serch');

Route::get('/addNewStickers/{shop}/{codes}/{numbers}','App\Http\Controllers\ORController@addNewStickers');

Route::get('/deleteNewStickers/{shop}/{YtoD}/{YtoS}','App\Http\Controllers\ORController@deleteNewStickers');

Route::get('/calendar',function(){return view('calendar');});

Route::get('/createSheet/{shop}/{date}/{method}/{source}/{comment}','App\Http\Controllers\ORController@createSheet');

Route::get('/showSheetList/{shop}','App\Http\Controllers\ORController@showSheetList');

Route::get('/selectSheet/{code}','App\HTTP\Controllers\ORController@selectSheet');

Route::get('/moveWall/{shop}/{wall}','App\HTTP\Controllers\ORController@moveWall');

Route::get('getStickerRanking/{startDate}/{endDate}','App\HTTP\Controllers\ORController@getStickerRanking');


Route::get('/changesizesheet','App\Http\Controllers\customerNotes@index');


Route::post('/test_post','App\Http\Controllers\ORController@test_post');



Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
