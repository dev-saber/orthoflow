<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        'dentist_id',
        'item',
        'quantity',
        'purchase_date',
        'purchase_price',
    ];

    public function dentist()
    {
        return $this->belongsTo(User::class);
    }
}
