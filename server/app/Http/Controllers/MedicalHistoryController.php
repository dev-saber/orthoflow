<?php

namespace App\Http\Controllers;

use App\Models\MedicalHistory;
use Illuminate\Http\Request;

class MedicalHistoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return response()->json([
            'data' => MedicalHistory::with('patient')->whereHas('patient', function ($query) use ($request) {
                $query->where('dentist_id', $request->user()->id);
            })->orderBy('visit_date', 'desc')->get(),
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
