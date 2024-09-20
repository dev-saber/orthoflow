<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use App\Models\Patient;
use Illuminate\Http\Request;

class Dashboard extends Controller
{
    public function appointmentsToday(Request $request)
    {
        // 
    }

    public function billsStats(Request $request)
    {
        return response()->json([
            'unpaidClients' => Patient::where('dentist_id', $request->user()->id)
                ->whereHas('bills', function ($query) {
                    $query->where('status', 'unpaid');
                })->count(),
            'unpaidSum' => Bill::whereHas('patient', function ($query) use ($request) {
                $query->where('dentist_id', $request->user()->id);
            })->where('status', 'unpaid')->sum('amount'),
        ]);
    }
}
