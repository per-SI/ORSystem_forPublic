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
    Route::get('/orderandreplace','App\Http\Controllers\ORController@index');
    Route::get('/ORsystem/{shop}','App\Http\Controllers\ORController@showWall');
});

Route::get('/top',function(){
    return view('app');
});

Route::get('/orderandreplace/newWall','App\Http\Controllers\ORController@newWall');

Route::post('/orderandreplace/createNewWall','App\Http\Controllers\ORController@createNewWall');

Route::post('/orderandreplace/sample','App\Http\Controllers\ORController@sample');


Route::get('/orderandreplace/readData/{numbers}','App\Http\Controllers\ORController@getStickerInfo');

Route::get('/orderandreplace/modalOpen/{number}','App\Http\Controllers\ORController@modalOpen');

Route::get('/orderandreplace/shop/{shop}/{wallNum}','App\Http\Controllers\ORController@giveData');

Route::get('/orderandreplace/replace/{shop}/{wall}/{X}/{Y}/{codes}/{ncodes}','App\Http\Controllers\ORController@replace');

Route::get('/orderandreplace/Layout/{shop}/{wall}','App\Http\Controllers\ORController@Layout');

Route::post('/orderandreplace/saveLayout/{shop}/{wall}/{rowLength}/{bottomLength}/{topNew}/{bottomNew}/{leftNew}/{rightNew}/{topDel}/{bottomDel}/{leftDel}/{rightDel}','App\Http\Controllers\ORController@changeLayout');

Route::post('/orderandreplace/deleteWall','App\Http\Controllers\ORController@deleteWall');

Route::get('/orderandreplace/newStickers/{shop}','App\Http\Controllers\ORController@newStickers');

Route::get('/orderandreplace/registerPage','App\Http\Controllers\ORController@registerPage');

Route::post('/orderandreplace/upload','App\Http\Controllers\ORController@upload');

Route::post('/orderandreplace/delete','App\Http\Controllers\ORController@delete');

Route::get('/orderandreplace/order/{sheetNum}/{pCode}/{quantity}','App\Http\Controllers\ORController@order');

Route::get('/orderandreplace/saveTemporary/{shop}/{wall}/{X}/{Y}/{codes}/{ncodes}/{scodes}','App\Http\Controllers\ORController@saveTemporary');

Route::get('/orderandreplace/readTemporary/{shop}/{wall}','App\Http\Controllers\ORController@readTemporary');

Route::get('/orderandreplace/search/{word}','App\Http\Controllers\ORController@serch');

Route::get('/orderandreplace/addNewStickers/{shop}/{codes}/{numbers}','App\Http\Controllers\ORController@addNewStickers');

Route::get('/orderandreplace/deleteNewStickers/{shop}/{YtoD}/{YtoS}','App\Http\Controllers\ORController@deleteNewStickers');

Route::get('/orderandreplace/calendar',function(){return view('calendar');});

Route::get('/orderandreplace/createSheet/{shop}/{date}/{method}/{source}/{comment}','App\Http\Controllers\ORController@createSheet');

Route::get('/orderandreplace/showSheetList/{shop}','App\Http\Controllers\ORController@showSheetList');

Route::get('/orderandreplace/selectSheet/{code}','App\HTTP\Controllers\ORController@selectSheet');

Route::get('/orderandreplace/moveWall/{shop}/{wall}','App\HTTP\Controllers\ORController@moveWall');

Route::get('/orderandreplace/getStickerRanking/{startDate}/{endDate}','App\HTTP\Controllers\ORController@getStickerRanking');


Route::get('/orderandreplace/changesizesheet','App\Http\Controllers\customerNotes@index');


Route::post('/test_post','App\Http\Controllers\ORController@test_post');



Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
