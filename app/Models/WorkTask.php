<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkTask extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        
        'description',
        'has_duration',
        'until',
        'grabbed_by',
        'grabbed_date',
        'transferred_to',
        'transferred_date',
        'finished_by',
        'finished_date',
        'remarks',
        
        'encodedcount_enable',
        'encodedcount',
        'has_tosendimageproof',
        'proof_image',
    ];
}
