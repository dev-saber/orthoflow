<?php

namespace App\Http\Controllers;

use App\Models\Stock;
use Illuminate\Http\Request;

class StockController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return response()->json([
            'data' => Stock::where('dentist_id', $request->user()->id)->get()
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $item = Stock::findOrFail($id);
        $item->update($request->all());

        return response()->json([
            'message' => 'Stock updated successfully',
        ], 200);
    }
}
