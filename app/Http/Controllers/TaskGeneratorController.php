<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TaskGenerator;
use Illuminate\Support\Facades\Auth;

class TaskGeneratorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $task_list = TaskGenerator::paginate(10)->onEachSide(1);

        return inertia('TaskGenerator/Index', [
            'task_list' => $task_list,
            'msg' => session('msg'),
            'msgtype' => session('msgtype'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('TaskGenerator/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $r)
    {
        TaskGenerator::create([
            'name' => mb_strtoupper($r->name),
            'description' => $r->description,
            'generate_every' => $r->generate_every,
            'weekly_whatday' => $r->weekly_whatday,
            'monthly_whatday' => $r->monthly_whatday,
            'has_duration' => $r->has_duration,
            'duration_type' => $r->duration_type,
            'duration_daily_whattime' => $r->duration_daily_whattime,
            'duration_weekly_howmanydays' => $r->duration_weekly_howmanydays,
            'duration_monthly_howmanymonth' => $r->duration_monthly_howmanymonth,
            'duration_yearly_howmanyyear' => $r->duration_yearly_howmanyyear,
            'encodedcount_enable' => $r->encodedcount_enable,
            'has_tosendimageproof' => $r->has_tosendimageproof,
        ]);

        return to_route('taskgenerator.index')
        ->with('msg', 'Task Generator was successfully added.')
        ->with('msgtype', 'success');
    }

    /**
     * Display the specified resource.
     */
    public function show(TaskGenerator $taskGenerator)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TaskGenerator $taskGenerator)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TaskGenerator $taskGenerator)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TaskGenerator $taskGenerator)
    {
        //
    }
}
