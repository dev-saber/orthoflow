<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\BillController;
use App\Http\Controllers\Dashboard;
use App\Http\Controllers\MedicalHistoryController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::post('/logout', [UserController::class, 'logout']);
    Route::get('/info', [UserController::class, 'userInfo']);
    Route::patch('/update', [UserController::class, 'updateUserInfo']);
    Route::resource('appointments', AppointmentController::class);
    Route::resource('patients', PatientController::class);
    Route::resource('stock', StockController::class);
    Route::resource('bills', BillController::class);
    Route::resource('medical-history', MedicalHistoryController::class);
    Route::get('/dashboard/appointments', [Dashboard::class, 'appointmentsToday']);
    Route::get('/dashboard/stock', [Dashboard::class, 'stockStats']);
    Route::get('/dashboard/bills', [Dashboard::class, 'billsStats']);
});
