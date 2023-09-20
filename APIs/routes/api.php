<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CabinsController;
use App\Http\Controllers\GuestsController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\BookingsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


//cabins
Route::apiResource('cabins', CabinsController::class);
Route::post('cabins/{cabin}', [CabinsController::class, 'update']);//this one must be a post request because it's not possible to send a file(the cabin image) through a put request!
Route::get('cabins/empty', [CabinsController::class, 'truncate']);

//guests
Route::apiResource('guests', GuestsController::class);
Route::get('guests/empty', [GuestsController::class, 'truncate']);

//bookings
Route::apiResource('bookings', BookingsController::class);
Route::get('bookings/empty', [BookingsController::class, 'truncate']);

//settings
Route::apiResource('settings', SettingsController::class);

