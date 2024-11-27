<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
?>

<?php
// Configuración de la conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "formulario_db";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Variables para filtros
$searchKeyword = isset($_GET['keyword']) ? $_GET['keyword'] : '';
$category = isset($_GET['category']) ? $_GET['category'] : '';
$date = isset($_GET['date']) ? $_GET['date'] : '';

// Consulta SQL dinámica
$sql = "SELECT * FROM articles WHERE 1=1";

if ($searchKeyword) {
    $sql .= " AND title LIKE '%" . $conn->real_escape_string($searchKeyword) . "%'";
}
if ($category) {
    $sql .= " AND category = '" . $conn->real_escape_string($category) . "'";
}
if ($date) {
    $sql .= " AND publish_date = '" . $conn->real_escape_string($date) . "'";
}

$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestión de Artículos</title>
    <style>
      /* General */
      body {
            font-family: Arial, sans-serif;
            margin: 20px;
            color: #333;
            background: #4CA1AF;  /* fallback for old browsers */
            background: -webkit-linear-gradient(to right, #C4E0E5, #4CA1AF);  /* Chrome 10-25, Safari 5.1-6 */
            background: linear-gradient(to right, #C4E0E5, #4CA1AF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

        }

        h1 {
            text-align: center;
            color: #149dab;
            font-size: 2.5em;
            margin-bottom: 20px;
        }

        /* Formulario */
        .form-container {
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 20px;
            margin-bottom: 20px;
        }

        form {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            justify-content: space-between;
        }

        label {
            font-weight: bold;
            margin-right: 10px;
        }

        input[type="text"],
        input[type="date"],
        select {
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
            width: 100%;
            max-width: 200px;
        }

        button {
            background-color: #4CAF50;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1em;
            transition: background-color 0.3s;
        }

        button:hover {
            background-color: #45a049;
        }

        /* Tabla */
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            background-color: #fff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        th, td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
        }

        th {
            background-color: #14b1c1;
            color: white;
            font-weight: bold;
        }

        td {
            font-size: 1em;
        }

        tr:nth-child(even) {
            background-color: #f2f2f2;
        }

        tr:hover {
            background-color: #e9f5e9;
        }

        /* Mensaje de no resultados */
        p {
            text-align: center;
            font-size: 1.2em;
            color: #999;
        }
    </style>
</head>

<body>
    <h1>ARTÍCULOS EN BIBLIOTECA</h1>

    <div class="form-container">
        <form method="GET" action="">
            <label for="keyword">Buscar:</label>
            <input type="text" id="keyword" name="keyword" value="<?= htmlspecialchars($searchKeyword) ?>">

            <label for="category">Categoría:</label>
            <select id="category" name="category">
                <option value="">Todas</option>
                <option value="Deporte" <?= $category == 'Deporte' ? 'selected' : '' ?>>Deporte</option>
                <option value="Moda" <?= $category == 'Moda' ? 'selected' : '' ?>>Moda</option>
                <option value="Hogar" <?= $category == 'Hogar' ? 'selected' : '' ?>>Hogar</option>
            </select>

            <label for="date">Fecha:</label>
            <input type="date" id="date" name="date" value="<?= htmlspecialchars($date) ?>">

            <button type="submit">Buscar</button>
        </form>
    </div>

    <?php if ($result && $result->num_rows > 0): ?>
        <table>
            <thead>
                <tr>
                    <th>Título</th>
                    <th>Categoría</th>
                    <th>Fecha de publicación</th>
                </tr>
            </thead>
            <tbody>
                <?php while ($row = $result->fetch_assoc()): ?>
                    <tr>
                        <td><?= htmlspecialchars($row['title']) ?></td>
                        <td><?= htmlspecialchars($row['category']) ?></td>
                        <td>
                        <?php
                            // Convertir la fecha al formato dd/mm/aaaa
                            $date = new DateTime($row['publish_date']);
                            echo $date->format('d/m/Y');
                            ?>
                        </td>
                    </tr>
                <?php endwhile; ?>
            </tbody>
        </table>
    <?php else: ?>
        <p>No se encontraron resultados.</p>
    <?php endif; ?>

    <?php $conn->close(); ?>
</body>

</html>