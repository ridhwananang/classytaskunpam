<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('laporans', function (Blueprint $table) {
            $table->id();
            $table->string('no_product_id_second')->nullable();
            $table->string('no_product_id')->nullable();
            $table->string('Nama_Bundling')->nullable();
            $table->string('variasi')->nullable();
            $table->text('Items')->nullable(); 
            $table->Integer('count_of_Jumlah')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('laporans');
    }
};
// -- SELECT 
// --     b.Nama_Bundling,
// --     b.Items AS nama_item,
// --     SUM(l.count_of_Jumlah * b.count_of_Jumlah) AS total_terjual
// -- FROM 
// --     laporans l
// -- JOIN 
// --     bundlings b 
// --     ON TRIM(l.Nama_Bundling) = TRIM(b.Nama_Bundling)
// -- WHERE 
// --     b.Items IS NOT NULL
// -- GROUP BY 
// --     b.Nama_Bundling, b.Items
// -- ORDER BY 
// --     b.Nama_Bundling ASC,
// --     total_terjual DESC;
// -- 1. Data dari bundling (diurai dari master bundlings)
// -- Bagian 1: bundling

// -- =======================================================================================

// -- SELECT 
// --     b.Nama_Bundling AS nama_produk,
// --     b.Items AS nama_item,
// --     b.Items AS variasi,
// --     SUM(l.count_of_Jumlah * b.count_of_Jumlah) AS total_terjual
// -- FROM 
// --     laporans l
// -- JOIN 
// --     bundlings b 
// --     ON TRIM(l.Nama_Bundling) = TRIM(b.Nama_Bundling)
// -- WHERE 
// --     b.Items IS NOT NULL
// -- GROUP BY 
// --     b.Nama_Bundling, b.Items

// -- UNION ALL

// -- -- Bagian 2: non-bundling atau bundling tanpa master bundling
// -- SELECT
// --     l.Nama_Bundling AS Bundling, -- biar bisa dilihat juga kalau ada bundling tapi gak masuk master
// --     l.variasi AS nama_item,
// --     l.variasi AS variasi,
// --     SUM(
// --       l.count_of_Jumlah * 
// --       CASE
// --         WHEN l.variasi REGEXP '^[0-9]+ Pcs' THEN CAST(SUBSTRING_INDEX(l.variasi, ' Pcs', 1) AS UNSIGNED)
// --         ELSE 1
// --       END
// --     ) AS total_terjual
// -- FROM 
// --     laporans l
// -- LEFT JOIN bundlings b 
// --     ON TRIM(l.Nama_Bundling) = TRIM(b.Nama_Bundling)
// -- WHERE 
// --     b.Nama_Bundling IS NULL -- artinya gak ketemu di bundling
// --     AND l.variasi IS NOT NULL
// -- GROUP BY 
// --     l.Nama_Bundling, l.variasi;
// -- =================================================================================================================
// -- SELECT 
// --     final.nama_item,
// --     SUM(final.total_terjual) AS total_terjual
// -- FROM (
// --     -- 1. Produk dari bundling (master bundling)
// --     SELECT 
// --         b.Items AS nama_item,
// --         SUM(l.count_of_Jumlah * b.count_of_Jumlah) AS total_terjual
// --     FROM 
// --         laporans l
// --     JOIN 
// --         bundlings b 
// --         ON TRIM(l.Nama_Bundling) = TRIM(b.Nama_Bundling)
// --     WHERE 
// --         b.Items IS NOT NULL
// --     GROUP BY 
// --         b.Items

// --     UNION ALL

// --     -- 2. Produk bundling yang tidak tercatat di master bundling
// --     SELECT
// --         l.variasi AS nama_item,
// --         SUM(
// --             l.count_of_Jumlah * 
// --             CASE
// --                 WHEN l.variasi REGEXP '^[0-9]+ Pcs' THEN CAST(SUBSTRING_INDEX(l.variasi, ' Pcs', 1) AS UNSIGNED)
// --                 ELSE 1
// --             END
// --         ) AS total_terjual
// --     FROM 
// --         laporans l
// --     LEFT JOIN bundlings b 
// --         ON TRIM(l.Nama_Bundling) = TRIM(b.Nama_Bundling)
// --     WHERE 
// --         b.Nama_Bundling IS NULL
// --         AND l.variasi IS NOT NULL
// --     GROUP BY 
// --         l.variasi

// --     UNION ALL

// --     -- 3. Produk non-bundling (tanpa Nama_Bundling)
// --     SELECT
// --         l.variasi AS nama_item,
// --         SUM(
// --             l.count_of_Jumlah *
// --             CASE
// --                 WHEN l.variasi REGEXP '^[0-9]+ Pcs' THEN CAST(SUBSTRING_INDEX(l.variasi, ' Pcs', 1) AS UNSIGNED)
// --                 ELSE 1
// --             END
// --         ) AS total_terjual
// --     FROM 
// --         laporans l
// --     WHERE 
// --         (l.Nama_Bundling IS NULL OR TRIM(l.Nama_Bundling) = '')
// --         AND l.variasi IS NOT NULL
// --     GROUP BY 
// --         l.variasi
// -- ) AS final
// -- GROUP BY 
// --     final.nama_item
// -- ORDER BY 
// --     total_terjual DESC;

// -- ==========================================================================================================
// -- 1. Produk dari bundling yang cocok dengan master bundling
// SELECT 
//     b.Nama_Bundling AS nama_produk,
//     b.Items AS variasi,
//     SUM(l.count_of_Jumlah * b.count_of_Jumlah) AS total
// FROM 
//     laporans l
// JOIN 
//     bundlings b 
//     ON TRIM(l.Nama_Bundling) = TRIM(b.Nama_Bundling)
// WHERE 
//     b.Items IS NOT NULL
// GROUP BY 
//     b.Nama_Bundling, b.Items

// UNION ALL

// -- 2. Produk non-bundling atau bundling yang tidak tercatat di master bundling
// SELECT
//     l.Nama_Bundling AS nama_produk,
//     l.variasi AS variasi,
//     SUM(
//         l.count_of_Jumlah * 
//         CASE
//             WHEN l.variasi REGEXP '^[0-9]+ Pcs' THEN CAST(SUBSTRING_INDEX(l.variasi, ' Pcs', 1) AS UNSIGNED)
//             ELSE 1
//         END
//     ) AS total_terjual
// FROM 
//     laporans l
// LEFT JOIN bundlings b 
//     ON TRIM(l.Nama_Bundling) = TRIM(b.Nama_Bundling)
// WHERE 
//     b.Nama_Bundling IS NULL
//     AND l.variasi IS NOT NULL
// GROUP BY 
//     l.Nama_Bundling, l.variasi;
