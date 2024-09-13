<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use Illuminate\Http\Request;

class BillController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return response()->json([
            'bills' => Bill::with('patient')->whereHas('patient', function ($query) use ($request) {
                $query->where('dentist_id', $request->user()->id);
            })->orderBy('created_at', 'desc')->get(),
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Bill::create($request->all());

        return response()->json([
            'message' => 'Bill created successfully',
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $bill = Bill::findOrFail($id);
        $bill->update($request->only(['status', 'amount']));

        return response()->json([
            'message' => 'Bill updated successfully',
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $bill = Bill::findOrFail($id);
        $bill->delete();

        return response()->json([
            'message' => 'Bill deleted successfully',
        ], 200);
    }
}
