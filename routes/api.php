<?php

use Illuminate\Http\Request;
use App\Models\Todo;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;


// Route for user authentication
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);


// Protected routes, requiring a valid API token
Route::middleware('auth:api')->group(function() {
  
    // Authenticated user information
    Route::get('/me', [AuthController::class, 'me']);
    Route::get('/users', [AuthController::class, 'index']);
    Route::get('/users/{id}', [AuthController::class, 'show']);
    
    // Task routes with user assignment
    Route::post('/assign-tasks', [TaskController::class, 'assignUserToTasks']); 
    
  
    Route::get('/taskTable', [TaskController::class, 'index']); 
    Route::get('/taskTable/getTasksByEmail', [TaskController::class, 'getTasksByUserEmail']); 
    Route::get('/taskTable/{id}', [TaskController::class, 'show']); 
    Route::post('/taskTable', [TaskController::class, 'store']); 
    Route::put('/taskTable/{id}', [TaskController::class, 'update']);
    Route::delete('/taskTable/{id}', [TaskController::class, 'destroy']);
});

// Optional: Route for error handling (if needed in future)
Route::get('/error', function () {
    return response()->json(['message' => 'Route not defined'], 404);
})->name('error.route.name');


?>
