<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;

class TestController extends Controller
{
    public function index() {
        dd(Carbon::now()->addDays(1)->format('Y-m-d 12:00:00'));
    }
}
