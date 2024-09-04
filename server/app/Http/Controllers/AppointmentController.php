<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return response()->json([
            'appointments' => Appointment::where('dentist_id', $request->user()->id)->with('patient')->orderBy('date', 'asc')->get()
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            Appointment::create([
                'patient_id' => $request->patient_id,
                'dentist_id' => $request->user()->id,
                'date' => $request->date,
                'start_time' => $request->start_time,
                'end_time' => $request->end_time,
                'status' => 'pending',
            ]);

            return response()->json([
                'message' => 'Appointment created successfully',
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create appointment'
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
