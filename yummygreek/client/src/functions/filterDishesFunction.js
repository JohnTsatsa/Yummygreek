export function filterDishes(dishes, selectedDietaryPreferences, selectedAllergens, selectedPriceRange) {
    return dishes.filter((dish) => {
        // Check if 'dish.dietaryPreferences' is defined and an array before using 'includes'
        const meetsDietaryPreferences =
            selectedDietaryPreferences.length === 0 ||
            (Array.isArray(dish.dietaryPreferences) &&
                selectedDietaryPreferences.every((filter) =>
                    dish.dietaryPreferences.includes(filter)
                ));

        // Check if 'dish.allergens' is defined and an array before checking for allergens
        const hasAllergens =
            Array.isArray(dish.allergens) &&
            selectedAllergens.some((filter) => dish.allergens.includes(filter));

        // Check if 'dish.price' is defined and falls within selected price range
        const meetsPriceRange =
            selectedPriceRange === '' ||
            (selectedPriceRange === 'under 8' && dish.price < 8) ||
            (selectedPriceRange === '8-11' && dish.price >= 8 && dish.price < 11) ||
            (selectedPriceRange === '11-13' && dish.price >= 11 && dish.price <= 13) ||
            (selectedPriceRange === 'over 13' && dish.price > 13);


        return meetsDietaryPreferences && !hasAllergens && meetsPriceRange;
    });
}
