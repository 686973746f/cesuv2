<?php

namespace App\Http\Controllers;

use App\Models\SyndromicRecords;
use Illuminate\Http\Request;

class IcsTicketController extends Controller
{
    public function index() {
        $list = SyndromicRecords::where('facility_id', auth()->user()->itr_facility_id)
        ->whereNull('ics_grabbedby')
        ->orderBy('created_at', 'DESC')
        ->paginate(10)
        ->onEachside(1);
        
        return inertia('Ics/Index', [
            'list' => $list,
        ]);
    }
}
