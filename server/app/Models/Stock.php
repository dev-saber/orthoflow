<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'price',
        'quantity',
        'reorder_level',
        'dentist_id',
    ];

    public function dentist()
    {
        return $this->belongsTo(User::class);
    }
}
