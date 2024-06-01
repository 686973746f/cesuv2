<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SyndromicRecords;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\OpdTicketResource;
use App\Http\Resources\WorkTaskResource;
use App\Models\WorkTask;

class TaskController extends Controller
{
    public function index() {
        //Fetch Grabbed Tickets
        $grabbed_opdlist = SyndromicRecords::where('facility_id', auth()->user()->itr_facility_id)
        ->where('ics_grabbedby', Auth::id())
        ->orderBy('ics_grabbed_date', 'ASC')
        ->paginate(5)
        ->onEachside(1);

        $grabbed_worklist = WorkTask::where('status', 'PENDING')
        ->where('grabbed_by', Auth::id())
        ->paginate(10);

        //Fetch Open Tickets
        $open_worklist = WorkTask::where('status', 'OPEN')->paginate(10);

        $open_opdlist = SyndromicRecords::where('facility_id', auth()->user()->itr_facility_id)
        ->whereNull('ics_grabbedby')
        ->orderBy('created_at', 'DESC')
        ->paginate(10)
        ->onEachside(1);
        
        return inertia('Tasks/Index', [
            'open_worklist' => WorkTaskResource::collection($open_worklist),
            'open_opdlist' => OpdTicketResource::collection($open_opdlist),

            'grabbed_worklist' => $grabbed_worklist,
            'grabbed_opdlist' => OpdTicketResource::collection($grabbed_opdlist),
            'msg' => session('msg'),
            'msgtype' => session('msgtype'),
        ]);
    }

    public function grabTicket(Request $r) {
        $id = $r->ticket_id;
        $queryParameters = request()->query();

        if($r->type == 'opd') {
            $update = SyndromicRecords::findOrFail($id);

            $ticket_grabbedby = $update->ics_grabbedby;
            $ticket_status = $update->ics_ticketstatus;

        }
        else if($r->type == 'work') {
            $update = WorkTask::findOrFail($id);

            $ticket_grabbedby = $update->grabbed_by;
            $ticket_status = $update->status;
        }

        if(!is_null($ticket_grabbedby) && $ticket_grabbedby != Auth::id()) {
            return to_route('task_index', $queryParameters)
            ->with('msg', 'Error: Ticket was already grabbed by the other user. Please try another.')
            ->with('msgtype', 'warning');
        }
        else if($ticket_status == 'CLOSED' || $ticket_status == 'FINISHED') {
            return to_route('task_index', $queryParameters)
            ->with('msg', 'Error: Ticket was already been closed or finished. Please try another.')
            ->with('msgtype', 'warning');
        }
        else {
            if($r->type == 'opd') {
                $update->ics_grabbedby = Auth::id();
                $update->ics_grabbed_date = date('Y-m-d H:i:s');
                $update->ics_ticketstatus = 'PENDING';
            }
            else if($r->type == 'work') {
                $update->grabbed_by = Auth::id();
                $update->grabbed_date = date('Y-m-d H:i:s');
                $update->status = 'PENDING';
            }

            if($update->isDirty()) {
                $update->save();
            }
        }

        if($r->type == 'opd') {
            $msg = 'Successfully grabbed the ticket. Please transfer the Patient details to iClinicSys before closing this ticket.';
            $msgtype = 'success';

            return to_route('opdtask_view', $id)
            ->with('msg', $msg)
            ->with('msgtype', $msgtype);
        }
        else if($r->type == 'work') {
            $msg = 'Successfully grabbed the work ticket. Please perform the task before closing the ticket.';
            $msgtype = 'success';

            return to_route('worktask_view', $id)
            ->with('msg', $msg)
            ->with('msgtype', $msgtype);
        }
    }

    public function viewOpdTicket(SyndromicRecords $id) {
        return inertia('Tasks/ViewOpdTicket', [
            'd' => new OpdTicketResource($id),
            'msg' => session('msg'),
            'msgtype' => session('msgtype'),
        ]);
    }

    public function viewWorkTicket(WorkTask $workTask) {
        return inertia('Tasks/ViewWorkTicket', [
            'd' => new WorkTaskResource($workTask),
            'msg' => session('msg'),
            'msgtype' => session('msgtype'),
        ]);
    }

    public function closeOpdTicket(SyndromicRecords $syndromicRecords, Request $r) {

    }

    public function closeWorkTicket(WorkTask $workTask, Request $r) {
        if($workTask->areYouTheOwner()) {
            $workTask->update([
                'finished_by' => Auth::id(),
                'finished_date' => date('Y-m-d H:i:s'),
                'remarks' => $r->remarks,
                'encodedcount' => $r->encodedcount ?: NULL,
                'status' => 'FINISHED',
            ]);

            $msg = 'Work Task ID #'.$workTask->id.' was closed successfully.';
            $msgtype = 'success';

            return to_route('task_index')
            ->with('msg', $msg)
            ->with('msgtype', $msgtype);
        }
    }

    public function moreOpdTask() {

    }

    public function moreCesuTask() {
        
    }
}
