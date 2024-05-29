<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TaskController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::redirect('/', '/dashboard');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function() {
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))->name('dashboard');

    Route::get('/tasks', [TaskController::class, 'index'])->name('task_index');
    Route::post('/tasks/grab_ticket', [TaskController::class, 'grabTicket'])->name('task_grab');
    Route::get('/tasks/cesu_task/view/{id}', [TaskController::class, 'viewOpdTicket'])->name('opdtask_view');
    Route::get('/tasks/opd/view/{id}', [TaskController::class, 'viewOpdTicket'])->name('opdtask_view');

    Route::post('/tasks/opd/view/{id}/close_ticket', [TaskController::class, 'viewOpdTicket'])->name('opdtask_view');
    Route::post('/tasks/cesu_task/view/{id}/close_ticket', [TaskController::class, 'viewOpdTicket'])->name('opdtask_view');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
