<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SyndromicRecords;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\OpdTicketResource;

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
            'msg' => session('msg'),
            'msgtype' => session('msgtype'),
        ]);
    }

    public function grabOpdTicket(Request $r) {
        $id = $r->ticket_id;

        dd($id);

        $update = SyndromicRecords::findOrFail($id);

        $queryParameters = request()->query();

        if(!is_null($update->ics_grabbedby)) {
            return to_route('task_index', $queryParameters)
            ->with('msg', 'Error: Ticket was already grabbed by the other user. Please try another.')
            ->with('msgtype', 'warning');
        }
        else {
            $update->ics_grabbedby = Auth::id();
            $update->ics_grabbed_date = date('Y-m-d H:i:s');
        }

        return to_route('opdtask_view', $id);
    }

    public function viewOpdTicket($id) {
        $d = SyndromicRecords::findOrFail($id);

        return inertia('Tasks/ViewTicket', [
            'd' => $d,
            'msg' => session('msg'),
            'msgtype' => session('msgtype'),
        ]);
    }
}
