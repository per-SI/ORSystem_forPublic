<?php

use Illuminate\Support\Facades\Route;

Auth::routes();


Route::group(['middleware'=>'auth'],function(){
    Route::get('/',function () {
        return view('welcome');
    });
    Route::get('/orderandreplace/{shop}','App\Http\Controllers\sample@showWall');
});

Route::get('/newWall','App\Http\Controllers\sample@newWall');

Route::post('/createNewWall','App\Http\Controllers\sample@createNewWall');

Route::post('/sample','App\Http\Controllers\sample@sample');


Route::get('/readData/{numbers}','App\Http\Controllers\sample@getStickerInfo');

Route::get('/modalOpen/{number}','App\Http\Controllers\sample@modalOpen');

Route::get('/shop/{shop}/{wallNum}','App\Http\Controllers\sample@giveData');

Route::get('/replace/{shop}/{wall}/{X}/{Y}/{codes}/{ncodes}','App\Http\Controllers\sample@replace');

Route::get('/Layout/{shop}/{wall}','App\Http\Controllers\sample@Layout');

Route::post('/saveLayout/{shop}/{wall}/{rowLength}/{bottomLength}/{topNew}/{bottomNew}/{leftNew}/{rightNew}/{topDel}/{bottomDel}/{leftDel}/{rightDel}','App\Http\Controllers\sample@changeLayout');

Route::get('/newStickers/{shop}','App\Http\Controllers\sample@newStickers');

Route::get('/registerPage','App\Http\Controllers\sample@registerPage');

Route::post('/upload','App\Http\Controllers\sample@upload');

Route::post('/delete','App\Http\Controllers\sample@delete');

Route::get('/order/{sheetNum}/{pCode}/{quantity}','App\Http\Controllers\sample@order');

Route::get('/saveTemporary/{shop}/{wall}/{X}/{Y}/{codes}/{ncodes}/{scodes}','App\Http\Controllers\sample@saveTemporary');

Route::get('/readTemporary/{shop}/{wall}','App\Http\Controllers\sample@readTemporary');

Route::get('/search/{word}','App\Http\Controllers\sample@serch');

Route::get('/addNewStickers/{shop}/{codes}/{numbers}','App\Http\Controllers\sample@addNewStickers');

Route::get('/deleteNewStickers/{shop}/{YtoD}/{YtoS}','App\Http\Controllers\sample@deleteNewStickers');

Route::get('/calendar',function(){return view('calendar');});

Route::get('/createSheet/{shop}/{date}/{method}/{source}/{comment}','App\Http\Controllers\sample@createSheet');

Route::get('/showSheetList/{shop}','App\Http\Controllers\sample@showSheetList');

Route::get('/selectSheet/{code}','App\HTTP\Controllers\sample@selectSheet');

Route::get('/moveWall/{shop}/{wall}','App\HTTP\Controllers\sample@moveWall');

Route::get('getStickerRanking/{startDate}/{endDate}','App\HTTP\Controllers\sample@getStickerRanking');


Route::get('/changesizesheet','App\Http\Controllers\customerNotes@index');


Route::post('/test_post','App\Http\Controllers\sample@test_post');



Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
