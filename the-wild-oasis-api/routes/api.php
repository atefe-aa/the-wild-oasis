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

//guests
Route::apiResource('guests', GuestsController::class);

//bookings
Route::apiResource('bookings', BookingsController::class);

//settings
Route::apiResource('settings', SettingsController::class);

