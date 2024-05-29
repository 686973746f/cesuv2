<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OpdTicketResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->syndromic_patient->getName(),
            'age_sex' => $this->syndromic_patient->getAge().'/'.$this->syndromic_patient->sg(),
            'created_at' => Carbon::parse($this->created_at)->format('m/d/Y h:i A'),
            'createdBy' => new UserResource($this->user),
        ];
    }
}
