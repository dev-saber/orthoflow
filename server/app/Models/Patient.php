<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'date_of_birth',
        'phone',
        'dentist_id',
    ];

    protected function dentist()
    {
        return $this->belongsTo(User::class);
    }

    protected function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    protected function medicalHistory()
    {
        return $this->hasOne(MedicalHistory::class);
    }

    protected function bills()
    {
        return $this->hasMany(Bill::class);
    }
}
