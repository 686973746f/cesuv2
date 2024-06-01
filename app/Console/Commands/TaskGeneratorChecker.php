<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use App\Models\WorkTask;
use Illuminate\Console\Command;

class TaskGeneratorChecker extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:task-generator-checker';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $date_now = Carbon::now()->format('Y-m-d H:i:s');

        $find_tickets = WorkTask::whereIn('status', ['OPEN', 'PENDING'])
        ->where('has_duration', 'Y')
        ->where('until', '<=', $date_now)
        ->update([
            'status' => 'CLOSED',
        ]);
    }
}
