import type { Task } from '$lib/models/Task';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

const tasks: Task[] = [];

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData(); // Recuperer les données du formulaire

		// Recuperer la valeur du champ taskName
		// Le "as string" est necessaire car formData.get retourne "string | null" (string OU null)
		const taskName: string = formData.get('task') as string;

		// Si le champ est vide, on ne fait rien
		if (!taskName) {
			// Retourner une erreur 400 (Bad Request - Les données envoyées sont incorrectes)
			// Le deuxieme parametre est le contenu retourné au client. On peut y mettre n'importe quelle donnée
			// Ici, on retourne un objet avec une propriété "error" à true
			// Cela permettra au client de savoir que la requete a échoué
			return fail(400, { error: true, message: 'Task name is required'});
		}

		// Generer un identifiant unique
		const taskId = crypto.randomUUID(); 
		const newTask: Task = {
			name: taskName,
			id: taskId,
		};

		// Ajouter la nouvelle tache à la liste
		tasks.push(newTask);
		return {
			tasks: tasks,
		}
	}
} satisfies Actions;
