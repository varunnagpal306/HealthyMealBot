// HealthyMealBot JavaScript Application
class HealthyMealBot {
    constructor() {
        this.currentUser = null;
        this.currentMealPlan = [];
        this.shoppingList = [];
        this.init();
    }

    // Recipe data from the provided JSON
    recipes = [
        {
            id: 1,
            name: "Paneer Bhurji",
            category: "Breakfast",
            cuisine: "Indian",
            prep_time: 15,
            cook_time: 10,
            total_time: 25,
            servings: 2,
            difficulty: "Easy",
            calories: 280,
            protein: 18,
            carbs: 8,
            fat: 20,
            fiber: 3,
            ingredients: [
                {name: "Paneer", quantity: 200, unit: "g"},
                {name: "Onion", quantity: 1, unit: "medium"},
                {name: "Tomato", quantity: 1, unit: "medium"},
                {name: "Green chillies", quantity: 2, unit: "pieces"},
                {name: "Turmeric powder", quantity: 0.5, unit: "tsp"},
                {name: "Cumin seeds", quantity: 1, unit: "tsp"},
                {name: "Oil", quantity: 1, unit: "tbsp"},
                {name: "Salt", quantity: 1, unit: "tsp"},
                {name: "Coriander leaves", quantity: 2, unit: "tbsp"}
            ],
            instructions: [
                "Heat oil in a pan, add cumin seeds",
                "Add chopped onions and green chillies, sauté until golden",
                "Add tomatoes and cook until soft",
                "Add turmeric and salt, mix well",
                "Crumble paneer and add to the pan",
                "Cook for 3-4 minutes, garnish with coriander"
            ],
            tags: ["high-protein", "low-carb", "vegetarian", "quick", "breakfast"],
            dietary_type: "Vegetarian",
            available_in_pune: true
        },
        {
            id: 2,
            name: "Tandoori Chicken",
            category: "Dinner",
            cuisine: "Indian",
            prep_time: 120,
            cook_time: 25,
            total_time: 145,
            servings: 4,
            difficulty: "Medium",
            calories: 225,
            protein: 52,
            carbs: 2,
            fat: 5,
            fiber: 0,
            ingredients: [
                {name: "Chicken breast", quantity: 500, unit: "g"},
                {name: "Yogurt", quantity: 50, unit: "g"},
                {name: "Ginger garlic paste", quantity: 10, unit: "g"},
                {name: "Ghee", quantity: 1, unit: "tbsp"},
                {name: "Salt", quantity: 1, unit: "tsp"},
                {name: "Red chilli powder", quantity: 1, unit: "tsp"},
                {name: "Tandoori masala", quantity: 1, unit: "tsp"},
                {name: "Kasuri methi", quantity: 0.5, unit: "tsp"},
                {name: "Lime juice", quantity: 0.5, unit: "piece"}
            ],
            instructions: [
                "Cut chicken breast into pieces",
                "Marinate with yogurt, ginger-garlic paste, spices and lime juice for 2 hours",
                "Heat ghee in a pan",
                "Cook marinated chicken on medium heat for 20-25 minutes",
                "Turn occasionally until cooked through",
                "Garnish with kasuri methi and serve hot"
            ],
            tags: ["high-protein", "low-carb", "non-vegetarian", "dinner", "keto-friendly"],
            dietary_type: "Non-Vegetarian",
            available_in_pune: true
        },
        {
            id: 3,
            name: "Egg Curry",
            category: "Lunch",
            cuisine: "Indian",
            prep_time: 10,
            cook_time: 20,
            total_time: 30,
            servings: 3,
            difficulty: "Easy",
            calories: 250,
            protein: 18,
            carbs: 8,
            fat: 15,
            fiber: 2,
            ingredients: [
                {name: "Eggs", quantity: 6, unit: "pieces"},
                {name: "Onion", quantity: 2, unit: "medium"},
                {name: "Tomato", quantity: 2, unit: "medium"},
                {name: "Ginger garlic paste", quantity: 1, unit: "tbsp"},
                {name: "Coconut milk", quantity: 200, unit: "ml"},
                {name: "Turmeric powder", quantity: 0.5, unit: "tsp"},
                {name: "Red chilli powder", quantity: 1, unit: "tsp"},
                {name: "Cumin powder", quantity: 1, unit: "tsp"},
                {name: "Oil", quantity: 2, unit: "tbsp"},
                {name: "Salt", quantity: 1, unit: "tsp"}
            ],
            instructions: [
                "Boil eggs for 8 minutes, peel and set aside",
                "Heat oil, add onions and sauté until golden",
                "Add ginger-garlic paste, cook for 2 minutes",
                "Add tomatoes and cook until soft",
                "Add spices and cook for 2 minutes",
                "Add coconut milk and bring to boil",
                "Add boiled eggs and simmer for 5 minutes"
            ],
            tags: ["high-protein", "low-carb", "non-vegetarian", "lunch", "curry"],
            dietary_type: "Non-Vegetarian",
            available_in_pune: true
        },
        {
            id: 4,
            name: "Palak Paneer",
            category: "Dinner",
            cuisine: "Indian",
            prep_time: 15,
            cook_time: 20,
            total_time: 35,
            servings: 4,
            difficulty: "Medium",
            calories: 210,
            protein: 15,
            carbs: 12,
            fat: 12,
            fiber: 4,
            ingredients: [
                {name: "Paneer", quantity: 250, unit: "g"},
                {name: "Spinach", quantity: 500, unit: "g"},
                {name: "Onion", quantity: 1, unit: "medium"},
                {name: "Tomato", quantity: 1, unit: "medium"},
                {name: "Ginger garlic paste", quantity: 1, unit: "tbsp"},
                {name: "Green chillies", quantity: 2, unit: "pieces"},
                {name: "Cumin seeds", quantity: 1, unit: "tsp"},
                {name: "Garam masala", quantity: 1, unit: "tsp"},
                {name: "Oil", quantity: 2, unit: "tbsp"},
                {name: "Salt", quantity: 1, unit: "tsp"}
            ],
            instructions: [
                "Blanch spinach in boiling water for 2 minutes",
                "Make a smooth puree of blanched spinach",
                "Heat oil, add cumin seeds",
                "Add onions, cook until golden",
                "Add ginger-garlic paste and green chillies",
                "Add tomatoes and cook until soft",
                "Add spinach puree and bring to boil",
                "Add paneer cubes and garam masala",
                "Simmer for 5 minutes and serve"
            ],
            tags: ["high-protein", "low-carb", "vegetarian", "dinner", "iron-rich"],
            dietary_type: "Vegetarian",
            available_in_pune: true
        },
        {
            id: 5,
            name: "Cauliflower Rice Pulao",
            category: "Lunch",
            cuisine: "Indian",
            prep_time: 10,
            cook_time: 15,
            total_time: 25,
            servings: 4,
            difficulty: "Easy",
            calories: 120,
            protein: 6,
            carbs: 8,
            fat: 8,
            fiber: 4,
            ingredients: [
                {name: "Cauliflower", quantity: 1, unit: "medium head"},
                {name: "Green peas", quantity: 100, unit: "g"},
                {name: "Carrot", quantity: 1, unit: "medium"},
                {name: "Onion", quantity: 1, unit: "medium"},
                {name: "Cumin seeds", quantity: 1, unit: "tsp"},
                {name: "Bay leaves", quantity: 2, unit: "pieces"},
                {name: "Turmeric powder", quantity: 0.5, unit: "tsp"},
                {name: "Ghee", quantity: 2, unit: "tbsp"},
                {name: "Salt", quantity: 1, unit: "tsp"},
                {name: "Coriander leaves", quantity: 2, unit: "tbsp"}
            ],
            instructions: [
                "Grate cauliflower to make rice-like texture",
                "Heat ghee, add cumin seeds and bay leaves",
                "Add chopped onions, cook until golden",
                "Add carrots and peas, cook for 3 minutes",
                "Add cauliflower rice and turmeric",
                "Cook covered for 8-10 minutes",
                "Garnish with coriander and serve"
            ],
            tags: ["low-carb", "vegetarian", "lunch", "rice-substitute", "fiber-rich"],
            dietary_type: "Vegetarian",
            available_in_pune: true
        },
        {
            id: 6,
            name: "Grilled Paneer Tikka",
            category: "Snack",
            cuisine: "Indian",
            prep_time: 30,
            cook_time: 15,
            total_time: 45,
            servings: 4,
            difficulty: "Medium",
            calories: 190,
            protein: 14,
            carbs: 6,
            fat: 12,
            fiber: 2,
            ingredients: [
                {name: "Paneer", quantity: 300, unit: "g"},
                {name: "Bell peppers", quantity: 2, unit: "pieces"},
                {name: "Onion", quantity: 1, unit: "large"},
                {name: "Yogurt", quantity: 100, unit: "g"},
                {name: "Ginger garlic paste", quantity: 1, unit: "tbsp"},
                {name: "Red chilli powder", quantity: 1, unit: "tsp"},
                {name: "Turmeric powder", quantity: 0.5, unit: "tsp"},
                {name: "Garam masala", quantity: 1, unit: "tsp"},
                {name: "Oil", quantity: 1, unit: "tbsp"},
                {name: "Salt", quantity: 1, unit: "tsp"}
            ],
            instructions: [
                "Cut paneer, bell peppers, and onion into cubes",
                "Mix yogurt with all spices and oil",
                "Marinate paneer and vegetables for 30 minutes",
                "Thread onto skewers alternately",
                "Grill or pan-fry for 12-15 minutes",
                "Turn occasionally until golden brown",
                "Serve hot with mint chutney"
            ],
            tags: ["high-protein", "low-carb", "vegetarian", "snack", "grilled"],
            dietary_type: "Vegetarian",
            available_in_pune: true
        }
    ];

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupApplication();
            });
        } else {
            this.setupApplication();
        }
    }

    setupApplication() {
        this.setupEventListeners();
        this.loadUserData();
        this.updateCurrentDate();
        
        // Check if user is registered
        if (this.currentUser) {
            this.showMainApp();
            this.generateDailyMealPlan();
        } else {
            this.showOnboarding();
        }
    }

    setupEventListeners() {
        // Registration form
        const registrationForm = document.getElementById('registration-form');
        if (registrationForm) {
            registrationForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleRegistration();
            });
        }

        // Settings form
        const settingsForm = document.getElementById('settings-form');
        if (settingsForm) {
            settingsForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSettingsUpdate();
            });
        }

        // Tab navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchTab(e.target.getAttribute('data-tab'));
            });
        });

        // Modal controls
        const closeModal = document.getElementById('close-modal');
        if (closeModal) {
            closeModal.addEventListener('click', () => {
                this.closeModal('recipe-modal');
            });
        }
        
        const closeModalBtn = document.getElementById('close-modal-btn');
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                this.closeModal('recipe-modal');
            });
        }

        const closeSwapModal = document.getElementById('close-swap-modal');
        if (closeSwapModal) {
            closeSwapModal.addEventListener('click', () => {
                this.closeModal('swap-modal');
            });
        }

        // Shopping list controls
        const clearChecked = document.getElementById('clear-checked');
        if (clearChecked) {
            clearChecked.addEventListener('click', () => {
                this.clearCheckedItems();
            });
        }

        const checkAll = document.getElementById('check-all');
        if (checkAll) {
            checkAll.addEventListener('click', () => {
                this.checkAllItems();
            });
        }

        // Settings reset
        const resetSettings = document.getElementById('reset-settings');
        if (resetSettings) {
            resetSettings.addEventListener('click', () => {
                this.resetToDefaults();
            });
        }

        // Modal overlay clicks
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    this.closeModal(overlay.parentElement.id);
                }
            });
        });
    }

    loadUserData() {
        try {
            const userData = localStorage.getItem('healthyMealBotUser');
            if (userData) {
                this.currentUser = JSON.parse(userData);
            }
        } catch (error) {
            console.error('Error loading user data:', error);
            localStorage.removeItem('healthyMealBotUser');
        }
    }

    saveUserData() {
        try {
            localStorage.setItem('healthyMealBotUser', JSON.stringify(this.currentUser));
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    }

    updateCurrentDate() {
        const dateElement = document.getElementById('current-date');
        if (dateElement) {
            const today = new Date();
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            dateElement.textContent = today.toLocaleDateString('en-US', options);
        }
    }

    handleRegistration() {
        try {
            const excludedIngredients = [];
            document.querySelectorAll('input[name="excludeIngredients"]:checked').forEach(checkbox => {
                excludedIngredients.push(checkbox.value);
            });

            const userName = document.getElementById('userName').value.trim();
            const calorieGoal = document.getElementById('calorieGoal').value;
            const dietaryType = document.querySelector('input[name="dietaryType"]:checked').value;
            const proteinLevel = document.getElementById('proteinLevel').value;
            const carbLevel = document.getElementById('carbLevel').value;
            const mealCount = document.querySelector('input[name="mealCount"]:checked').value;

            if (!userName) {
                alert('Please enter your name');
                return;
            }

            this.currentUser = {
                name: userName,
                location: 'Pune',
                calorieGoal: parseInt(calorieGoal),
                dietaryType: dietaryType,
                proteinLevel: proteinLevel,
                carbLevel: carbLevel,
                mealCount: parseInt(mealCount),
                excludedIngredients: excludedIngredients,
                registrationDate: new Date().toISOString()
            };

            this.saveUserData();
            this.showMainApp();
            this.generateDailyMealPlan();
        } catch (error) {
            console.error('Error during registration:', error);
            alert('There was an error during registration. Please try again.');
        }
    }

    handleSettingsUpdate() {
        try {
            const excludedIngredients = [];
            document.querySelectorAll('input[name="settingsExcludedIngredients"]:checked').forEach(checkbox => {
                excludedIngredients.push(checkbox.value);
            });

            const userName = document.getElementById('settingsUserName').value.trim();
            const calorieGoal = document.getElementById('settingsCalorieGoal').value;
            const dietaryType = document.querySelector('input[name="settingsDietaryType"]:checked').value;
            const proteinLevel = document.getElementById('settingsProteinLevel').value;
            const carbLevel = document.getElementById('settingsCarbLevel').value;
            const mealCount = document.querySelector('input[name="settingsMealCount"]:checked').value;

            this.currentUser = {
                ...this.currentUser,
                name: userName,
                calorieGoal: parseInt(calorieGoal),
                dietaryType: dietaryType,
                proteinLevel: proteinLevel,
                carbLevel: carbLevel,
                mealCount: parseInt(mealCount),
                excludedIngredients: excludedIngredients
            };

            this.saveUserData();
            this.generateDailyMealPlan();
            this.showSuccessMessage('Settings updated successfully!');
        } catch (error) {
            console.error('Error updating settings:', error);
            alert('There was an error updating settings. Please try again.');
        }
    }

    showOnboarding() {
        document.getElementById('onboarding').classList.remove('hidden');
        document.getElementById('home-tab').classList.add('hidden');
        document.getElementById('shopping-tab').classList.add('hidden');
        document.getElementById('settings-tab').classList.add('hidden');

        // Hide nav buttons during onboarding
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.style.display = 'none';
        });
    }

    showMainApp() {
        document.getElementById('onboarding').classList.add('hidden');
        document.getElementById('home-tab').classList.remove('hidden');
        
        // Show nav buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.style.display = 'inline-flex';
        });

        this.populateSettingsForm();
    }

    populateSettingsForm() {
        if (!this.currentUser) return;

        const settingsUserName = document.getElementById('settingsUserName');
        const settingsCalorieGoal = document.getElementById('settingsCalorieGoal');
        const settingsProteinLevel = document.getElementById('settingsProteinLevel');
        const settingsCarbLevel = document.getElementById('settingsCarbLevel');

        if (settingsUserName) settingsUserName.value = this.currentUser.name;
        if (settingsCalorieGoal) settingsCalorieGoal.value = this.currentUser.calorieGoal;
        if (settingsProteinLevel) settingsProteinLevel.value = this.currentUser.proteinLevel;
        if (settingsCarbLevel) settingsCarbLevel.value = this.currentUser.carbLevel;
        
        // Set dietary type radio
        const dietaryTypeRadio = document.querySelector(`input[name="settingsDietaryType"][value="${this.currentUser.dietaryType}"]`);
        if (dietaryTypeRadio) dietaryTypeRadio.checked = true;
        
        // Set meal count radio
        const mealCountRadio = document.querySelector(`input[name="settingsMealCount"][value="${this.currentUser.mealCount}"]`);
        if (mealCountRadio) mealCountRadio.checked = true;
    }

    switchTab(tabName) {
        if (!tabName) return;

        // Update nav buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeBtn = document.querySelector(`[data-tab="${tabName}"]`);
        if (activeBtn) activeBtn.classList.add('active');

        // Show appropriate tab content
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.add('hidden');
        });
        const targetTab = document.getElementById(`${tabName}-tab`);
        if (targetTab) targetTab.classList.remove('hidden');

        // Generate shopping list if shopping tab is selected
        if (tabName === 'shopping') {
            this.generateShoppingList();
        }
    }

    filterRecipes() {
        if (!this.currentUser) return this.recipes;

        return this.recipes.filter(recipe => {
            // Filter by dietary type
            if (this.currentUser.dietaryType === 'Vegetarian' && recipe.dietary_type !== 'Vegetarian') {
                return false;
            }
            if (this.currentUser.dietaryType === 'Non-Vegetarian' && recipe.dietary_type === 'Vegetarian') {
                // Allow vegetarian recipes for non-vegetarian users
            }

            // Filter by protein level
            if (this.currentUser.proteinLevel === 'High-Protein' && recipe.protein < 15) {
                return false;
            }
            if (this.currentUser.proteinLevel === 'Very High-Protein' && recipe.protein < 20) {
                return false;
            }

            // Filter by carb level
            if (this.currentUser.carbLevel === 'Very Low-Carb' && recipe.carbs > 5) {
                return false;
            }
            if (this.currentUser.carbLevel === 'Low-Carb' && recipe.carbs > 15) {
                return false;
            }

            // Filter by excluded ingredients
            if (this.currentUser.excludedIngredients && this.currentUser.excludedIngredients.length > 0) {
                const hasExcludedIngredient = recipe.ingredients.some(ingredient => {
                    return this.currentUser.excludedIngredients.some(excluded => {
                        if (excluded === 'Dairy' && ['Paneer', 'Yogurt', 'Milk', 'Cheese'].some(dairy => 
                            ingredient.name.toLowerCase().includes(dairy.toLowerCase()))) {
                            return true;
                        }
                        if (excluded === 'Eggs' && ingredient.name.toLowerCase().includes('egg')) {
                            return true;
                        }
                        return ingredient.name.toLowerCase().includes(excluded.toLowerCase());
                    });
                });
                if (hasExcludedIngredient) return false;
            }

            return true;
        });
    }

    generateDailyMealPlan() {
        const filteredRecipes = this.filterRecipes();
        this.currentMealPlan = [];

        const mealCategories = this.currentUser.mealCount === 3 
            ? ['Breakfast', 'Lunch', 'Dinner'] 
            : ['Lunch', 'Dinner'];

        mealCategories.forEach(category => {
            const categoryRecipes = filteredRecipes.filter(recipe => 
                recipe.category === category || 
                (category === 'Breakfast' && recipe.category === 'Snack')
            );
            
            if (categoryRecipes.length > 0) {
                const randomRecipe = categoryRecipes[Math.floor(Math.random() * categoryRecipes.length)];
                this.currentMealPlan.push({...randomRecipe, mealType: category});
            }
        });

        this.renderMealPlan();
        this.updateNutritionSummary();
    }

    renderMealPlan() {
        const container = document.getElementById('meals-container');
        if (!container) return;
        
        container.innerHTML = '';

        this.currentMealPlan.forEach((recipe, index) => {
            const mealCard = this.createMealCard(recipe, index);
            container.appendChild(mealCard);
        });
    }

    createMealCard(recipe, index) {
        const card = document.createElement('div');
        card.className = 'meal-card';
        
        card.innerHTML = `
            <div class="meal-header">
                <div class="meal-category">${recipe.mealType}</div>
                <div class="meal-name">${recipe.name}</div>
                <div class="meal-meta">
                    <span>⏱️ ${recipe.total_time} min</span>
                    <span>🍽️ ${recipe.cuisine}</span>
                    <span>📊 ${recipe.difficulty}</span>
                </div>
            </div>
            <div class="meal-body">
                <div class="meal-nutrition">
                    <div class="nutrition-stat">
                        <span class="nutrition-stat-value">${recipe.calories}</span>
                        <span class="nutrition-stat-label">kcal</span>
                    </div>
                    <div class="nutrition-stat">
                        <span class="nutrition-stat-value">${recipe.protein}g</span>
                        <span class="nutrition-stat-label">protein</span>
                    </div>
                    <div class="nutrition-stat">
                        <span class="nutrition-stat-value">${recipe.carbs}g</span>
                        <span class="nutrition-stat-label">carbs</span>
                    </div>
                    <div class="nutrition-stat">
                        <span class="nutrition-stat-value">${recipe.fat}g</span>
                        <span class="nutrition-stat-label">fat</span>
                    </div>
                </div>
                <div class="meal-actions">
                    <button class="btn btn--primary" data-recipe-id="${recipe.id}">View Recipe</button>
                    <button class="btn btn--outline" data-meal-index="${index}" data-meal-type="${recipe.mealType}">Swap Recipe</button>
                </div>
            </div>
        `;

        // Add event listeners to the buttons
        const viewBtn = card.querySelector('[data-recipe-id]');
        const swapBtn = card.querySelector('[data-meal-index]');
        
        if (viewBtn) {
            viewBtn.addEventListener('click', () => {
                this.showRecipeDetail(recipe.id);
            });
        }
        
        if (swapBtn) {
            swapBtn.addEventListener('click', () => {
                this.showSwapOptions(index, recipe.mealType);
            });
        }

        return card;
    }

    showRecipeDetail(recipeId) {
        const recipe = this.recipes.find(r => r.id === recipeId);
        if (!recipe) return;

        document.getElementById('modal-recipe-name').textContent = recipe.name;
        document.getElementById('modal-cuisine').textContent = `🍽️ ${recipe.cuisine}`;
        document.getElementById('modal-difficulty').textContent = `📊 ${recipe.difficulty}`;
        document.getElementById('modal-time').textContent = `⏱️ ${recipe.total_time} min`;
        
        document.getElementById('modal-calories').textContent = `${recipe.calories} kcal`;
        document.getElementById('modal-protein').textContent = `${recipe.protein}g`;
        document.getElementById('modal-carbs').textContent = `${recipe.carbs}g`;
        document.getElementById('modal-fat').textContent = `${recipe.fat}g`;

        // Ingredients
        const ingredientsList = document.getElementById('modal-ingredients');
        ingredientsList.innerHTML = '';
        recipe.ingredients.forEach(ingredient => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${ingredient.name}</span>
                <span>${ingredient.quantity} ${ingredient.unit}</span>
            `;
            ingredientsList.appendChild(li);
        });

        // Instructions
        const instructionsList = document.getElementById('modal-instructions');
        instructionsList.innerHTML = '';
        recipe.instructions.forEach(instruction => {
            const li = document.createElement('li');
            li.textContent = instruction;
            instructionsList.appendChild(li);
        });

        document.getElementById('recipe-modal').classList.remove('hidden');
    }

    showSwapOptions(mealIndex, mealType) {
        const filteredRecipes = this.filterRecipes();
        const currentRecipe = this.currentMealPlan[mealIndex];
        
        const alternatives = filteredRecipes.filter(recipe => 
            (recipe.category === mealType || (mealType === 'Breakfast' && recipe.category === 'Snack')) &&
            recipe.id !== currentRecipe.id
        ).slice(0, 3);

        const swapContainer = document.getElementById('swap-options');
        swapContainer.innerHTML = '';

        alternatives.forEach(recipe => {
            const option = document.createElement('div');
            option.className = 'swap-option';
            option.innerHTML = `
                <div class="swap-option-name">${recipe.name}</div>
                <div class="swap-option-meta">
                    ${recipe.calories} kcal • ${recipe.protein}g protein • ${recipe.carbs}g carbs • ${recipe.total_time} min
                </div>
            `;
            option.addEventListener('click', () => {
                this.swapRecipe(mealIndex, recipe);
                this.closeModal('swap-modal');
            });
            swapContainer.appendChild(option);
        });

        document.getElementById('swap-modal').classList.remove('hidden');
    }

    swapRecipe(mealIndex, newRecipe) {
        this.currentMealPlan[mealIndex] = {...newRecipe, mealType: this.currentMealPlan[mealIndex].mealType};
        this.renderMealPlan();
        this.updateNutritionSummary();
    }

    updateNutritionSummary() {
        const totals = this.currentMealPlan.reduce((acc, recipe) => {
            acc.calories += recipe.calories;
            acc.protein += recipe.protein;
            acc.carbs += recipe.carbs;
            acc.fat += recipe.fat;
            return acc;
        }, { calories: 0, protein: 0, carbs: 0, fat: 0 });

        const calorieGoal = this.currentUser.calorieGoal;
        const proteinGoal = Math.round(calorieGoal * 0.3 / 4); // 30% of calories from protein
        const carbGoal = Math.round(calorieGoal * 0.3 / 4); // 30% of calories from carbs
        const fatGoal = Math.round(calorieGoal * 0.4 / 9); // 40% of calories from fat

        this.updateProgressBar('calories', totals.calories, calorieGoal, 'kcal');
        this.updateProgressBar('protein', totals.protein, proteinGoal, 'g');
        this.updateProgressBar('carbs', totals.carbs, carbGoal, 'g');
        this.updateProgressBar('fat', totals.fat, fatGoal, 'g');
    }

    updateProgressBar(nutrient, current, goal, unit) {
        const percentage = Math.min((current / goal) * 100, 100);
        const progressBar = document.getElementById(`${nutrient}-progress`);
        const valueSpan = document.getElementById(`${nutrient}-value`);

        if (progressBar && valueSpan) {
            progressBar.style.width = `${percentage}%`;
            valueSpan.textContent = `${Math.round(current)} / ${goal} ${unit}`;

            // Color coding
            progressBar.className = 'nutrition-progress';
            if (percentage >= 80 && percentage <= 110) {
                progressBar.classList.add('good');
            } else if (percentage > 110) {
                progressBar.classList.add('over');
            } else if (percentage < 50) {
                progressBar.classList.add('warning');
            }
        }
    }

    generateShoppingList() {
        this.shoppingList = [];
        const ingredientMap = new Map();

        this.currentMealPlan.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => {
                const key = ingredient.name.toLowerCase();
                if (ingredientMap.has(key)) {
                    const existing = ingredientMap.get(key);
                    // Simple quantity addition (assumes same units)
                    existing.quantity += ingredient.quantity;
                } else {
                    ingredientMap.set(key, {
                        name: ingredient.name,
                        quantity: ingredient.quantity,
                        unit: ingredient.unit,
                        checked: false
                    });
                }
            });
        });

        this.shoppingList = Array.from(ingredientMap.values());
        this.renderShoppingList();
    }

    renderShoppingList() {
        const container = document.getElementById('shopping-items');
        if (!container) return;
        
        container.innerHTML = '';

        if (this.shoppingList.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--color-text-secondary);">No items in shopping list. Generate a meal plan first.</p>';
            return;
        }

        this.shoppingList.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = `shopping-item ${item.checked ? 'checked' : ''}`;
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = item.checked;
            checkbox.addEventListener('change', () => {
                this.toggleShoppingItem(index);
            });

            const itemInfo = document.createElement('div');
            itemInfo.className = 'shopping-item-info';
            itemInfo.innerHTML = `
                <div class="shopping-item-name">${item.name}</div>
                <div class="shopping-item-quantity">${item.quantity} ${item.unit}</div>
            `;

            itemDiv.appendChild(checkbox);
            itemDiv.appendChild(itemInfo);
            container.appendChild(itemDiv);
        });
    }

    toggleShoppingItem(index) {
        this.shoppingList[index].checked = !this.shoppingList[index].checked;
        this.renderShoppingList();
    }

    clearCheckedItems() {
        this.shoppingList = this.shoppingList.filter(item => !item.checked);
        this.renderShoppingList();
    }

    checkAllItems() {
        this.shoppingList.forEach(item => item.checked = true);
        this.renderShoppingList();
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    resetToDefaults() {
        if (confirm('Are you sure you want to reset all settings to defaults?')) {
            document.getElementById('settingsUserName').value = this.currentUser.name;
            document.getElementById('settingsCalorieGoal').value = '1600';
            document.getElementById('settingsProteinLevel').value = 'High-Protein';
            document.getElementById('settingsCarbLevel').value = 'Low-Carb';
            
            const vegRadio = document.querySelector('input[name="settingsDietaryType"][value="Vegetarian"]');
            if (vegRadio) vegRadio.checked = true;
            
            const threeMealsRadio = document.querySelector('input[name="settingsMealCount"][value="3"]');
            if (threeMealsRadio) threeMealsRadio.checked = true;
            
            // Uncheck all excluded ingredients
            document.querySelectorAll('input[name="settingsExcludedIngredients"]').forEach(checkbox => {
                checkbox.checked = false;
            });
        }
    }

    showSuccessMessage(message) {
        // Simple success message implementation
        const messageDiv = document.createElement('div');
        messageDiv.className = 'success-message';
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--color-success);
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            z-index: 1001;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }
}

// Initialize the app
let app;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app = new HealthyMealBot();
    });
} else {
    app = new HealthyMealBot();
}

// Add CSS for success message animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);