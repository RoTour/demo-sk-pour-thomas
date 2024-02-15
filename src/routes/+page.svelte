<script lang="ts">
	import { page } from "$app/stores";
	import type { Task } from "$lib/models/Task";


	// Au chargement de la page, on a pas d'erreur
	let errorMessage = "";
	let tasks: Task[] = [];

	// Si le formulaire a renvoyé une reponse, et que cette reponse contient une erreur
	$: if ($page.form && $page.form.error) {
		errorMessage = $page.form.message;
	}

	// Si le formulaire a renvoyé une reponse, et que cette reponse contient une liste de taches
	$: if ($page.form && $page.form.tasks) {
		tasks = $page.form.tasks;
	}
</script>

<h1>Hello</h1>
<!-- Method POST pour les formulaire, y'en a besoin -->
<form method="post"> 
	<label for="task">Task</label>
	<input type="text" id="task" name="task" />

	<!-- Si on a un message d'erreur, on l'affiche -->
	{#if errorMessage}
		<p>{errorMessage}</p>
	{/if}

	<!-- Type submit sur le bouton pour envoyer un formulaire -->
	<button type="submit">Add</button>
</form>

<!-- Afficher les noms des taches -->
{#each tasks as task}
	<p>{task.name}</p>
{/each}
