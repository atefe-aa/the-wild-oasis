<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookingsController;
use App\Http\Controllers\CabinsController;
use App\Http\Controllers\GuestsController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\UserController;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', [AuthController::class, 'login']);
Route::post('signup', [AuthController::class, 'signup']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return new UserResource($request->user());
    }); 
    Route::post('user/{id}', [UserController::class, 'update']);
    
    Route::post('logout', [AuthController::class, 'logout']);
    
    //cabins
    Route::apiResource('cabins', CabinsController::class);
    Route::post('cabins/{cabin}', [CabinsController::class, 'update']); //this one must be a post request because it's not possible to send a file(the cabin image) through a put request!
    
    //guests
    Route::apiResource('guests', GuestsController::class);
    
    //bookings
    Route::apiResource('bookings', BookingsController::class);
    
    //settings
    Route::apiResource('settings', SettingsController::class);
});


