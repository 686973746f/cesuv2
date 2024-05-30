<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OpdTicketResource extends JsonResource
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
            'lname' => $this->syndromic_patient->lname,
            'fname' => $this->syndromic_patient->fname,
            'mname' => $this->syndromic_patient->mname ?: '',
            'suffix' => $this->syndromic_patient->suffix ?: '',
            'bdate' => $this->syndromic_patient->bdate,
            'sex' => $this->syndromic_patient->gender,
            'cs' => $this->syndromic_patient->cs,
            'contact_number' => $this->syndromic_patient->contact_number,
            
            'name' => $this->syndromic_patient->getName(),
            'age_sex' => $this->syndromic_patient->getAge().'/'.$this->syndromic_patient->sg(),
            'created_at' => Carbon::parse($this->created_at)->format('m/d/Y h:i A'),
            'createdBy' => new UserResource($this->user),
            'updatedBy' => new UserResource($this->updatedBy),
        ];
    }
}
