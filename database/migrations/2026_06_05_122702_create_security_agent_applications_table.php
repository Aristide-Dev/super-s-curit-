<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('security_agent_applications', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('phone');
            $table->string('email')->nullable();
            $table->unsignedTinyInteger('experience_years')->nullable();
            $table->string('availability')->nullable();
            $table->text('certifications')->nullable();
            $table->text('motivation')->nullable();
            $table->string('region_id');
            $table->string('region_name');
            $table->string('prefecture_id');
            $table->string('prefecture_name');
            $table->string('commune_id')->nullable();
            $table->string('commune_name')->nullable();
            $table->string('quartier_id')->nullable();
            $table->string('quartier_name')->nullable();
            $table->string('address_detail')->nullable();
            $table->string('status')->default('pending');
            $table->text('internal_notes')->nullable();
            $table->foreignId('reviewed_by_id')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('contacted_at')->nullable();
            $table->timestamps();

            $table->index('status');
            $table->index('prefecture_id');
            $table->index('commune_id');
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('security_agent_applications');
    }
};
