<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return response()->json([
            'patients' => Patient::where('dentist_id', $request->user()->id)->orderBy('created_at', 'desc')->get()
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            Patient::create([
                'dentist_id' => $request->user()->id,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'phone' => $request->phone,
                'date_of_birth' => $request->date_of_birth,
            ]);

            return response()->json([
                'message' => 'Patient created successfully',
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "$e"
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $patient = Patient::findOrFail($id);

            $patient->update([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'phone' => $request->phone,
                'date_of_birth' => $request->date_of_birth,
            ]);

            return response()->json([
                'message' => 'Patient updated successfully',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "$e"
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $patient = Patient::findOrFail($id);
        $patient->delete();

        return response()->json([
            'message' => 'Patient deleted successfully',
        ], 200);
    }
}
