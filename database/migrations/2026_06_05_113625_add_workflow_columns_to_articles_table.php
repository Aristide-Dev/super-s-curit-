<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->string('status')->default('pending_approval')->after('slug');
            $table->foreignId('created_by_id')->nullable()->after('status')->constrained('users')->nullOnDelete();
            $table->foreignId('approved_by_id')->nullable()->after('created_by_id')->constrained('users')->nullOnDelete();
            $table->foreignId('rejected_by_id')->nullable()->after('approved_by_id')->constrained('users')->nullOnDelete();
            $table->timestamp('submitted_at')->nullable()->after('published_at');
            $table->timestamp('approved_at')->nullable()->after('submitted_at');
            $table->timestamp('rejected_at')->nullable()->after('approved_at');
            $table->softDeletes();

            $table->index('status');
        });

        DB::table('articles')
            ->whereNotNull('published_at')
            ->update(['status' => 'published']);

        DB::table('articles')
            ->whereNull('published_at')
            ->update(['status' => 'pending_approval']);
    }

    public function down(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropForeign(['created_by_id']);
            $table->dropForeign(['approved_by_id']);
            $table->dropForeign(['rejected_by_id']);
            $table->dropColumn([
                'status',
                'created_by_id',
                'approved_by_id',
                'rejected_by_id',
                'submitted_at',
                'approved_at',
                'rejected_at',
                'deleted_at',
            ]);
        });
    }
};
