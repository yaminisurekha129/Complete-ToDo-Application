<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskTable;




// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/error', [AuthController::class, 'tokenerror'])->name('error.route.name');


//Route::get('/taskTable',[TaskTable::class,'index']);


Route::middleware('auth:api')->group(function(){

Route::get('/taskTable',[TaskTable::class,'index']);
Route::get('/taskTable/{id}',[TaskTable::class,'show']);
Route::post('/taskTable',[TaskTable::class,'store']);
Route::put('/taskTable/{id}',[TaskTable::class,'update']);
Route::delete('/taskTable/{id}',[TaskTable::class,'destroy']);


});


