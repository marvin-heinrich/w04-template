import type { PageLoad } from './$types';
import { env } from '$env/dynamic/public';

export const ssr = false;

let baseUrl = env.PUBLIC_API_URL || "http://localhost:8080";


export const load: PageLoad = async ({ fetch }) => {
    const res = await fetch(`${baseUrl}/mensa-garching/today`);
    const meals = await res.json();
    
    return { meals };
};

async function fetchMeals() {
    const res = await fetch(`${baseUrl}/mensa-garching/today`);
    if (res.ok) {
        meals = await res.json();
    }
}

// Fetch data once on component mount
onMount(async () => {
    await fetchMeals();
});



//...


{:else}
    <div class="food-grid">
        {#each meals as meal}
            <FoodCard {meal}/>
        {/each}
    </div>
{/if}