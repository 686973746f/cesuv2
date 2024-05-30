<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SyndromicRecords;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\OpdTicketResource;

class TaskController extends Controller
{
    public function index() {
        $existing_opd_tickets = SyndromicRecords::where('facility_id', auth()->user()->itr_facility_id)
        ->where('ics_grabbedby', Auth::id())
        ->orderBy('ics_grabbed_date', 'ASC')
        ->paginate(5)
        ->onEachside(1);

        $opdlist = SyndromicRecords::where('facility_id', auth()->user()->itr_facility_id)
        ->whereNull('ics_grabbedby')
        ->orderBy('created_at', 'DESC')
        ->paginate(10)
        ->onEachside(1);
        
        return inertia('Tasks/Index', [
            'opdlist' => OpdTicketResource::collection($opdlist),
            'existing_opd_tickets' => OpdTicketResource::collection($existing_opd_tickets),
            'msg' => session('msg'),
            'msgtype' => session('msgtype'),
        ]);
    }

    public function grabTicket(Request $r) {
        $id = $r->ticket_id;

        if($r->type == 'opd') {
            $update = SyndromicRecords::findOrFail($id);

            $queryParameters = request()->query();

            if(!is_null($update->ics_grabbedby)) {
                return to_route('task_index', $queryParameters)
                ->with('msg', 'Error: Ticket was already grabbed by the other user. Please try another.')
                ->with('msgtype', 'warning');
            }
            else {
                $update->ics_grabbedby = auth()->user()->id;
                $update->ics_grabbed_date = date('Y-m-d H:i:s');

                if($update->isDirty()) {
                    $update->save();
                }
            }

            return to_route('opdtask_view', $id)
            ->with('msg', 'Successfully grabbed the ticket. Please transfer the Patient details to iClinicSys before closing this ticket.')
            ->with('msgtype', 'success');
        }
        else {

        }

        
    }

    public function viewOpdTicket(SyndromicRecords $id) {

        return inertia('Tasks/ViewOpdTicket', [
            'd' => new OpdTicketResource($id),
            'msg' => session('msg'),
            'msgtype' => session('msgtype'),
        ]);
    }

    public function viewCesuTicket($id) {

    }

    public function closeOpdTicket($id) {

    }

    public function closeCesuTicket($id) {
        
    }

    public function moreOpdTask() {

    }

    public function moreCesuTask() {
        
    }
}
