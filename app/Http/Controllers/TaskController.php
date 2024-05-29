<?php

namespace App\Http\Controllers;

use App\Http\Resources\OpdTicketResource;
use Illuminate\Http\Request;
use App\Models\SyndromicRecords;

class TaskController extends Controller
{
    public function index() {
        $opdlist = SyndromicRecords::where('facility_id', auth()->user()->itr_facility_id)
        ->whereNull('ics_grabbedby')
        ->orderBy('created_at', 'DESC')
        ->paginate(10)
        ->onEachside(1);
        
        return inertia('Tasks/Index', [
            'opdlist' => OpdTicketResource::collection($opdlist),
        ]);
    }

    public function grab() {
        
    }
}
