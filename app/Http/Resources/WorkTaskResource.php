<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WorkTaskResource extends JsonResource
{
    public static $wrap = false;
    
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
        
            'status' => $this->status,
            'description' => $this->description,
            'has_duration' => $this->has_duration,
            'until' => $this->has_duration ? Carbon::parse($this->until)->format('m/d/Y h:i A') : 'N/A',
            'grabbed_by' => new UserResource($this->grabbedBy),
            'grabbed_date' => Carbon::parse($this->grabbed_date)->format('m/d/Y h:i A'),
            'transferred_to' => new UserResource($this->transferredTo),
            'transferred_date' => $this->transferred_date ? Carbon::parse($this->transferred_date)->format('m/d/Y h:i A') : NULL,
            'finished_by' =>  new UserResource($this->finishedBy),
            'finished_date' => Carbon::parse($this->finished_date)->format('m/d/Y h:i A'),
            'remarks' => $this->remarks,
            
            'encodedcount_enable' => $this->encodedcount_enable,
            'encodedcount' => $this->encodedcount,
            'has_tosendimageproof' => $this->has_tosendimageproof,
            'proof_image' => $this->proof_image,

            'created_at' => Carbon::parse($this->created_at)->format('m/d/Y h:i A'),
            'updated_at' => Carbon::parse($this->updated_at)->format('m/d/Y h:i A'),
        ];
    }
}
