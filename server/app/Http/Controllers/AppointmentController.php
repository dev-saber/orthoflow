<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Patient;
use Illuminate\Database\Eloquent\ModelNotFoundException;
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
        try {
            $appointment = Appointment::findOrFail($id);

            if ($request->has('date') && $request->date < now()) {
                return response()->json([
                    'message' => 'You cannot update past appointments',
                ], 400);
            }

            if ($request->has('start_time') && $request->has('end_time') && $request->start_time >= $request->end_time) {
                return response()->json([
                    'message' => 'End time must be greater than start time',
                ], 400);
            }

            if ($request->has('patient_id')) {
                $patient = Patient::find($request->patient_id);
                if (!$patient) {
                    return response()->json([
                        'message' => 'Patient not found',
                    ], 404);
                }
            }

            $appointment->update($request->only([
                'patient_id',
                'date',
                'start_time',
                'end_time',
                'status'
            ]));
            return response()->json([
                'message' => 'Appointment updated successfully',
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Appointment not found',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update appointment',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
