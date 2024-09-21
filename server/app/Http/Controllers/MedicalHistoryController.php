<?php

namespace App\Http\Controllers;

use App\Models\MedicalHistory;
use App\Models\Patient;
use Illuminate\Http\Request;

class MedicalHistoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return response()->json([
            'data' => Patient::where('dentist_id', $request->user()->id)
                ->with(['medicalHistories' => function ($query) {
                    $query->orderBy('visit_date', 'desc');
                }])
                ->withCount('medicalHistories')
                ->get(['id', 'first_name', 'last_name'])
                ->map(function ($patient) {
                    $patient->last_visit_date = $patient->medicalHistories->first()->visit_date ?? null; // get last visit date
                    return $patient;
                }),
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        MedicalHistory::create(
            array_merge($request->all(), ['dentist_id' => $request->user()->id])
        );

        return response()->json([
            'message' => 'Medical history created successfully',
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $medicalHistory = MedicalHistory::findOrFail($id);
        $medicalHistory->update($request->all());

        return response()->json([
            'message' => 'Medical history updated successfully',
            'data' => $medicalHistory,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $medicalHistory = MedicalHistory::findOrFail($id);
        $medicalHistory->delete();

        return response()->json([
            'message' => 'Medical history deleted successfully',
            'id' => $id,
        ], 200);
    }
}
