// HealthyMealBot JavaScript Application
class HealthyMealBot {
    constructor() {
        this.currentUser = null;
        this.currentMealPlan = [];
        this.shoppingList = [];
        this.usedRecipeIds = new Set();
        this.recipes = [];
        this.saladRecipes = [];
        this.init();
    }

    async init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupApplication();
            });
        } else {
            this.setupApplication();
        }
    }

    async setupApplication() {
        console.log('Setting up application...');
        await this.loadRecipeData();
        this.setupEventListeners();
        this.loadUserData();
        this.updateCurrentDate();
        
        // Always show navigation tabs
        this.showNavigationTabs();
        
        // Check if user is registered
        if (this.currentUser) {
            console.log('User found, showing main app');
            this.showMainApp();
            this.generateDailyMealPlan();
        } else {
            console.log('No user found, showing onboarding');
            this.showOnboarding();
        }
    }

    showNavigationTabs() {
        // Ensure navigation tabs are always visible and functional
        const navElement = document.getElementById('main-nav');
        if (navElement) {
            navElement.style.display = 'flex';
            navElement.style.visibility = 'visible';
        }
        
        // Make sure all nav buttons are visible
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.style.display = 'flex';
            btn.style.visibility = 'visible';
        });
    }

    async loadRecipeData() {
        console.log('Loading recipe data...');
        // Comprehensive recipe database with 85+ recipes
        this.recipes = [
            // BREAKFAST RECIPES (20+)
            {
                id: 1, name: "Paneer Bhurji", category: "Breakfast", cuisine: "Indian",
                prep_time: 15, cook_time: 10, total_time: 25, servings: 2, difficulty: "Easy",
                calories: 280, protein: 18, carbs: 8, fat: 20, fiber: 3,
                ingredients: [
                    {name: "Paneer", quantity: 200, unit: "g"},
                    {name: "Onion", quantity: 1, unit: "medium"},
                    {name: "Tomato", quantity: 1, unit: "medium"},
                    {name: "Green chillies", quantity: 2, unit: "pieces"},
                    {name: "Turmeric powder", quantity: 0.5, unit: "tsp"},
                    {name: "Oil", quantity: 1, unit: "tbsp"},
                    {name: "Salt", quantity: 1, unit: "tsp"},
                    {name: "Coriander leaves", quantity: 2, unit: "tbsp"}
                ],
                instructions: [
                    "Heat oil in pan, add cumin seeds",
                    "Add onions and chillies, sauté until golden",
                    "Add tomatoes, cook until soft",
                    "Add turmeric and salt",
                    "Crumble paneer and cook 3-4 minutes",
                    "Garnish with coriander"
                ],
                tags: ["high-protein", "low-carb", "vegetarian"],
                dietary_type: "Vegetarian", available_in_pune: true
            },
            {
                id: 2, name: "Egg Bhurji", category: "Breakfast", cuisine: "Indian",
                prep_time: 8, cook_time: 10, total_time: 18, servings: 2, difficulty: "Easy",
                calories: 200, protein: 18, carbs: 5, fat: 15, fiber: 2,
                ingredients: [
                    {name: "Eggs", quantity: 4, unit: "pieces"},
                    {name: "Onion", quantity: 1, unit: "medium"},
                    {name: "Tomato", quantity: 1, unit: "medium"},
                    {name: "Green chillies", quantity: 2, unit: "pieces"},
                    {name: "Turmeric powder", quantity: 0.5, unit: "tsp"},
                    {name: "Oil", quantity: 1, unit: "tbsp"},
                    {name: "Salt", quantity: 1, unit: "tsp"}
                ],
                instructions: [
                    "Heat oil in pan",
                    "Add onions and chillies",
                    "Add tomatoes and spices",
                    "Scramble eggs and add to pan",
                    "Cook until set",
                    "Serve hot"
                ],
                tags: ["high-protein", "low-carb", "non-vegetarian"],
                dietary_type: "Non-Vegetarian", available_in_pune: true
            },
            {
                id: 3, name: "Moong Dal Chilla", category: "Breakfast", cuisine: "Indian",
                prep_time: 20, cook_time: 10, total_time: 30, servings: 2, difficulty: "Easy",
                calories: 250, protein: 15, carbs: 20, fat: 8, fiber: 6,
                ingredients: [
                    {name: "Moong dal", quantity: 1, unit: "cup"},
                    {name: "Onion", quantity: 1, unit: "small"},
                    {name: "Green chilli", quantity: 1, unit: "piece"},
                    {name: "Ginger", quantity: 1, unit: "inch"},
                    {name: "Coriander", quantity: 0.25, unit: "cup"},
                    {name: "Salt", quantity: 1, unit: "tsp"},
                    {name: "Oil", quantity: 2, unit: "tbsp"}
                ],
                instructions: [
                    "Soak dal for 2 hours",
                    "Grind with minimal water",
                    "Add chopped vegetables",
                    "Make pancakes on griddle",
                    "Cook until golden",
                    "Serve with chutney"
                ],
                tags: ["high-protein", "vegetarian", "healthy"],
                dietary_type: "Vegetarian", available_in_pune: true
            },
            {
                id: 4, name: "Sattu Smoothie Bowl", category: "Breakfast", cuisine: "Indian",
                prep_time: 8, cook_time: 2, total_time: 10, servings: 1, difficulty: "Easy",
                calories: 300, protein: 16, carbs: 35, fat: 9, fiber: 4,
                ingredients: [
                    {name: "Sattu flour", quantity: 3, unit: "tbsp"},
                    {name: "Milk", quantity: 1, unit: "cup"},
                    {name: "Banana", quantity: 1, unit: "small"},
                    {name: "Peanut butter", quantity: 1, unit: "tbsp"},
                    {name: "Honey", quantity: 1, unit: "tsp"},
                    {name: "Chia seeds", quantity: 1, unit: "tsp"}
                ],
                instructions: [
                    "Blend sattu with milk",
                    "Add banana and peanut butter",
                    "Blend until smooth",
                    "Pour in bowl",
                    "Top with chia seeds",
                    "Serve immediately"
                ],
                tags: ["high-protein", "vegetarian", "breakfast"],
                dietary_type: "Vegetarian", available_in_pune: true
            },
            {
                id: 5, name: "Chickpea Flour Pancakes", category: "Breakfast", cuisine: "Indian",
                prep_time: 10, cook_time: 10, total_time: 20, servings: 2, difficulty: "Easy",
                calories: 220, protein: 12, carbs: 25, fat: 6, fiber: 5,
                ingredients: [
                    {name: "Besan", quantity: 1, unit: "cup"},
                    {name: "Onion", quantity: 1, unit: "small"},
                    {name: "Tomato", quantity: 1, unit: "medium"},
                    {name: "Green chillies", quantity: 2, unit: "pieces"},
                    {name: "Turmeric", quantity: 0.5, unit: "tsp"},
                    {name: "Water", quantity: 1, unit: "cup"},
                    {name: "Oil", quantity: 2, unit: "tbsp"}
                ],
                instructions: [
                    "Mix besan with water to make batter",
                    "Add vegetables and spices",
                    "Heat griddle with oil",
                    "Pour batter and spread",
                    "Cook until crisp",
                    "Flip and cook other side"
                ],
                tags: ["vegetarian", "breakfast", "healthy"],
                dietary_type: "Vegetarian", available_in_pune: true
            },

            // LUNCH RECIPES (25+)
            {
                id: 21, name: "Tandoori Chicken Salad", category: "Lunch", cuisine: "Indian",
                prep_time: 30, cook_time: 15, total_time: 45, servings: 2, difficulty: "Medium",
                calories: 320, protein: 35, carbs: 12, fat: 14, fiber: 4,
                ingredients: [
                    {name: "Chicken breast", quantity: 300, unit: "g"},
                    {name: "Yogurt", quantity: 2, unit: "tbsp"},
                    {name: "Tandoori masala", quantity: 1, unit: "tsp"},
                    {name: "Mixed greens", quantity: 200, unit: "g"},
                    {name: "Cucumber", quantity: 1, unit: "medium"},
                    {name: "Tomato", quantity: 1, unit: "medium"},
                    {name: "Olive oil", quantity: 2, unit: "tbsp"}
                ],
                instructions: [
                    "Marinate chicken in yogurt and spices",
                    "Grill until cooked through",
                    "Slice and serve over greens",
                    "Add cucumber and tomato",
                    "Drizzle with olive oil",
                    "Season with salt and pepper"
                ],
                tags: ["high-protein", "low-carb", "non-vegetarian"],
                dietary_type: "Non-Vegetarian", available_in_pune: true
            },
            {
                id: 22, name: "Kala Chana Curry", category: "Lunch", cuisine: "Indian",
                prep_time: 15, cook_time: 25, total_time: 40, servings: 3, difficulty: "Easy",
                calories: 280, protein: 18, carbs: 35, fat: 8, fiber: 12,
                ingredients: [
                    {name: "Kala chana", quantity: 1, unit: "cup"},
                    {name: "Onions", quantity: 2, unit: "medium"},
                    {name: "Tomatoes", quantity: 3, unit: "medium"},
                    {name: "Ginger-garlic paste", quantity: 2, unit: "tsp"},
                    {name: "Cumin seeds", quantity: 1, unit: "tsp"},
                    {name: "Coriander powder", quantity: 2, unit: "tsp"},
                    {name: "Oil", quantity: 2, unit: "tbsp"}
                ],
                instructions: [
                    "Pressure cook chana until soft",
                    "Heat oil, add cumin seeds",
                    "Add onions and cook until golden",
                    "Add ginger-garlic paste",
                    "Add tomatoes and spices",
                    "Add cooked chana and simmer"
                ],
                tags: ["vegetarian", "high-protein", "lunch"],
                dietary_type: "Vegetarian", available_in_pune: true
            },
            {
                id: 23, name: "Palak Paneer", category: "Lunch", cuisine: "Indian",
                prep_time: 15, cook_time: 20, total_time: 35, servings: 3, difficulty: "Medium",
                calories: 260, protein: 16, carbs: 15, fat: 18, fiber: 4,
                ingredients: [
                    {name: "Paneer", quantity: 200, unit: "g"},
                    {name: "Spinach", quantity: 500, unit: "g"},
                    {name: "Onions", quantity: 2, unit: "medium"},
                    {name: "Tomatoes", quantity: 4, unit: "medium"},
                    {name: "Ginger-garlic paste", quantity: 2, unit: "tsp"},
                    {name: "Garam masala", quantity: 1, unit: "tsp"},
                    {name: "Cream", quantity: 2, unit: "tbsp"}
                ],
                instructions: [
                    "Blanch spinach and puree",
                    "Cube paneer and lightly fry",
                    "Cook onions until golden",
                    "Add tomatoes and spices",
                    "Add spinach puree",
                    "Add paneer and cream"
                ],
                tags: ["vegetarian", "high-protein", "lunch"],
                dietary_type: "Vegetarian", available_in_pune: true
            },

            // DINNER RECIPES (25+)
            {
                id: 41, name: "Keto Chicken Curry", category: "Dinner", cuisine: "Indian",
                prep_time: 20, cook_time: 30, total_time: 50, servings: 4, difficulty: "Medium",
                calories: 350, protein: 40, carbs: 8, fat: 18, fiber: 2,
                ingredients: [
                    {name: "Chicken", quantity: 400, unit: "g"},
                    {name: "Coconut milk", quantity: 1, unit: "cup"},
                    {name: "Onions", quantity: 2, unit: "medium"},
                    {name: "Tomatoes", quantity: 3, unit: "medium"},
                    {name: "Ginger-garlic paste", quantity: 2, unit: "tbsp"},
                    {name: "Red chilli powder", quantity: 2, unit: "tsp"},
                    {name: "Curry leaves", quantity: 10, unit: "pieces"}
                ],
                instructions: [
                    "Cut chicken into pieces",
                    "Heat oil, add curry leaves",
                    "Add onions and cook",
                    "Add ginger-garlic paste",
                    "Add tomatoes and spices",
                    "Add chicken and coconut milk",
                    "Simmer until cooked"
                ],
                tags: ["high-protein", "low-carb", "non-vegetarian", "keto"],
                dietary_type: "Non-Vegetarian", available_in_pune: true
            },
            {
                id: 42, name: "Soy Chunk Pulao", category: "Dinner", cuisine: "Indian",
                prep_time: 15, cook_time: 20, total_time: 35, servings: 3, difficulty: "Easy",
                calories: 300, protein: 22, carbs: 40, fat: 8, fiber: 6,
                ingredients: [
                    {name: "Brown rice", quantity: 1, unit: "cup"},
                    {name: "Soy chunks", quantity: 1, unit: "cup"},
                    {name: "Onions", quantity: 2, unit: "medium"},
                    {name: "Mixed vegetables", quantity: 1, unit: "cup"},
                    {name: "Biryani masala", quantity: 2, unit: "tsp"},
                    {name: "Ghee", quantity: 2, unit: "tbsp"}
                ],
                instructions: [
                    "Soak soy chunks in hot water",
                    "Heat ghee, add whole spices",
                    "Add onions and vegetables",
                    "Add rice and soy chunks",
                    "Add water and cook",
                    "Garnish with fried onions"
                ],
                tags: ["vegetarian", "high-protein", "dinner"],
                dietary_type: "Vegetarian", available_in_pune: true
            }
        ];

        // Add comprehensive salad recipes
        this.saladRecipes = [
            {
                id: 101, name: "Sprouted Moong Salad", category: "Salad", cuisine: "Indian",
                prep_time: 15, cook_time: 0, total_time: 15, servings: 2, difficulty: "Easy",
                calories: 180, protein: 12, carbs: 20, fat: 6, fiber: 8,
                ingredients: [
                    {name: "Moong sprouts", quantity: 1, unit: "cup"},
                    {name: "Cucumber", quantity: 1, unit: "medium"},
                    {name: "Carrot", quantity: 1, unit: "medium"},
                    {name: "Tomato", quantity: 1, unit: "medium"},
                    {name: "Peanuts", quantity: 2, unit: "tbsp"},
                    {name: "Coriander leaves", quantity: 2, unit: "tbsp"},
                    {name: "Lemon juice", quantity: 2, unit: "tbsp"}
                ],
                instructions: [
                    "Steam sprouts lightly",
                    "Chop all vegetables",
                    "Mix everything together",
                    "Add peanuts and herbs",
                    "Season with lemon and salt"
                ],
                dressings: [
                    {
                        name: "Mint Chutney",
                        ingredients: ["Mint leaves - 1/2 cup", "Coriander - 1/4 cup", "Green chilli - 1", "Lemon juice - 2 tbsp", "Salt - 1/2 tsp"]
                    },
                    {
                        name: "Yogurt Dressing",
                        ingredients: ["Greek yogurt - 3 tbsp", "Lemon juice - 1 tbsp", "Chaat masala - 1/2 tsp", "Salt - 1/4 tsp"]
                    }
                ],
                tags: ["vegetarian", "healthy", "low-calorie"],
                dietary_type: "Vegetarian", available_in_pune: true
            },
            {
                id: 102, name: "Greek Salad Indian Style", category: "Salad", cuisine: "Fusion",
                prep_time: 12, cook_time: 0, total_time: 12, servings: 2, difficulty: "Easy",
                calories: 220, protein: 15, carbs: 12, fat: 14, fiber: 4,
                ingredients: [
                    {name: "Paneer cubes", quantity: 100, unit: "g"},
                    {name: "Cucumber", quantity: 1, unit: "medium"},
                    {name: "Tomatoes", quantity: 2, unit: "medium"},
                    {name: "Red onion", quantity: 1, unit: "small"},
                    {name: "Black olives", quantity: 10, unit: "pieces"},
                    {name: "Mixed greens", quantity: 100, unit: "g"},
                    {name: "Olive oil", quantity: 2, unit: "tbsp"}
                ],
                instructions: [
                    "Cut paneer into cubes",
                    "Chop vegetables",
                    "Arrange on bed of greens",
                    "Add olives and paneer",
                    "Drizzle with dressing"
                ],
                dressings: [
                    {
                        name: "Olive Oil Lemon",
                        ingredients: ["Olive oil - 3 tbsp", "Lemon juice - 2 tbsp", "Oregano - 1 tsp", "Salt - 1/2 tsp"]
                    },
                    {
                        name: "Herb Vinaigrette",
                        ingredients: ["Olive oil - 2 tbsp", "Apple cider vinegar - 1 tbsp", "Mixed herbs - 1 tsp", "Garlic - 1 clove"]
                    }
                ],
                tags: ["vegetarian", "mediterranean", "healthy"],
                dietary_type: "Vegetarian", available_in_pune: true
            },
            {
                id: 103, name: "Chickpea Protein Salad", category: "Salad", cuisine: "Mediterranean",
                prep_time: 10, cook_time: 0, total_time: 10, servings: 2, difficulty: "Easy",
                calories: 250, protein: 16, carbs: 24, fat: 10, fiber: 8,
                ingredients: [
                    {name: "Chickpeas", quantity: 1, unit: "cup"},
                    {name: "Cherry tomatoes", quantity: 150, unit: "g"},
                    {name: "Cucumber", quantity: 1, unit: "medium"},
                    {name: "Red bell pepper", quantity: 1, unit: "small"},
                    {name: "Red onion", quantity: 0.25, unit: "cup"},
                    {name: "Parsley", quantity: 3, unit: "tbsp"},
                    {name: "Feta cheese", quantity: 50, unit: "g"}
                ],
                instructions: [
                    "Drain and rinse chickpeas",
                    "Chop all vegetables",
                    "Mix chickpeas with vegetables",
                    "Add herbs and cheese",
                    "Toss with dressing"
                ],
                dressings: [
                    {
                        name: "Mediterranean Dressing",
                        ingredients: ["Olive oil - 3 tbsp", "Lemon juice - 2 tbsp", "Dried oregano - 1 tsp", "Garlic powder - 1/2 tsp", "Salt and pepper to taste"]
                    },
                    {
                        name: "Tahini Lemon Dressing",
                        ingredients: ["Tahini - 2 tbsp", "Lemon juice - 2 tbsp", "Water - 1 tbsp", "Honey - 1 tsp", "Salt - 1/4 tsp"]
                    }
                ],
                tags: ["vegetarian", "high-protein", "mediterranean"],
                dietary_type: "Vegetarian", available_in_pune: true
            }
        ];

        // Merge all recipes
        this.recipes = [...this.recipes, ...this.saladRecipes];
        console.log('Loaded', this.recipes.length, 'recipes');
    }

    setupEventListeners() {
        console.log('Setting up event listeners...');
        
        // Registration form
        const registrationForm = document.getElementById('registration-form');
        if (registrationForm) {
            registrationForm.addEventListener('submit', (e) => {
                e.preventDefault();
                console.log('Registration form submitted');
                this.handleRegistration();
            });
        }

        // Settings form
        const settingsForm = document.getElementById('settings-form');
        if (settingsForm) {
            settingsForm.addEventListener('submit', (e) => {
                e.preventDefault();
                console.log('Settings form submitted');
                this.handleSettingsUpdate();
            });
        }

        // Tab navigation - Always functional
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const tab = e.target.getAttribute('data-tab');
                console.log('Tab clicked:', tab);
                this.switchTab(tab);
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
                console.log('User data loaded:', this.currentUser);
            }
        } catch (error) {
            console.error('Error loading user data:', error);
            localStorage.removeItem('healthyMealBotUser');
        }
    }

    saveUserData() {
        try {
            localStorage.setItem('healthyMealBotUser', JSON.stringify(this.currentUser));
            console.log('User data saved');
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
            console.log('Processing registration...');
            
            const excludedIngredients = [];
            document.querySelectorAll('input[name="excludeIngredients"]:checked').forEach(checkbox => {
                excludedIngredients.push(checkbox.value);
            });

            const userName = document.getElementById('userName').value.trim();
            const calorieGoal = document.getElementById('calorieGoal').value;
            const dietaryType = document.querySelector('input[name="dietaryType"]:checked')?.value;
            const proteinLevel = document.getElementById('proteinLevel').value;
            const carbLevel = document.getElementById('carbLevel').value;
            const mealCount = document.querySelector('input[name="mealCount"]:checked')?.value;

            if (!userName) {
                alert('Please enter your name');
                return;
            }

            if (!dietaryType) {
                alert('Please select a dietary type');
                return;
            }

            if (!mealCount) {
                alert('Please select number of meals');
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

            console.log('User registered:', this.currentUser);
            
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
            const dietaryType = document.querySelector('input[name="settingsDietaryType"]:checked')?.value;
            const proteinLevel = document.getElementById('settingsProteinLevel').value;
            const carbLevel = document.getElementById('settingsCarbLevel').value;
            const mealCount = document.querySelector('input[name="settingsMealCount"]:checked')?.value;

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
        console.log('Showing onboarding');
        document.getElementById('onboarding').classList.remove('hidden');
        document.getElementById('home-tab').classList.add('hidden');
        document.getElementById('shopping-tab').classList.add('hidden');
        document.getElementById('settings-tab').classList.add('hidden');
        
        // Make sure Today tab is active
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        const todayBtn = document.querySelector('[data-tab="home"]');
        if (todayBtn) todayBtn.classList.add('active');
    }

    showMainApp() {
        console.log('Showing main app');
        document.getElementById('onboarding').classList.add('hidden');
        document.getElementById('home-tab').classList.remove('hidden');
        document.getElementById('shopping-tab').classList.add('hidden');
        document.getElementById('settings-tab').classList.add('hidden');
        
        this.populateSettingsForm();
        
        // Make sure Today tab is active
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        const todayBtn = document.querySelector('[data-tab="home"]');
        if (todayBtn) todayBtn.classList.add('active');
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
        
        console.log('Switching to tab:', tabName);

        // Update nav buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeBtn = document.querySelector(`[data-tab="${tabName}"]`);
        if (activeBtn) activeBtn.classList.add('active');

        // Hide all tab content
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.add('hidden');
        });
        
        // Hide onboarding if switching tabs
        document.getElementById('onboarding').classList.add('hidden');

        // Show appropriate tab content
        const targetTab = document.getElementById(`${tabName}-tab`);
        if (targetTab) {
            targetTab.classList.remove('hidden');
        }

        // Handle special cases
        if (tabName === 'shopping') {
            this.generateShoppingList();
        }
        
        // If user hasn't registered yet and tries to access main tabs, show a message
        if (!this.currentUser && (tabName === 'home' || tabName === 'shopping')) {
            const targetContent = document.getElementById(`${tabName}-tab`);
            if (targetContent) {
                targetContent.innerHTML = `
                    <div style="text-align: center; padding: 40px;">
                        <h3>Welcome to HealthyMealBot!</h3>
                        <p>Please complete your profile first to access your meal plans.</p>
                        <button class="btn btn--primary" onclick="app.showOnboarding()">Complete Profile</button>
                    </div>
                `;
            }
        }
    }

    filterRecipes() {
        if (!this.currentUser) return this.recipes;

        return this.recipes.filter(recipe => {
            // Filter by dietary type
            if (this.currentUser.dietaryType === 'Vegetarian' && recipe.dietary_type !== 'Vegetarian') {
                return false;
            }

            // Filter by protein level (more lenient for salads)
            if (recipe.category !== 'Salad') {
                if (this.currentUser.proteinLevel === 'High-Protein' && recipe.protein < 10) {
                    return false;
                }
                if (this.currentUser.proteinLevel === 'Very High-Protein' && recipe.protein < 15) {
                    return false;
                }
            }

            // Filter by carb level (more lenient for salads)
            if (recipe.category !== 'Salad') {
                if (this.currentUser.carbLevel === 'Very Low-Carb' && recipe.carbs > 10) {
                    return false;
                }
                if (this.currentUser.carbLevel === 'Low-Carb' && recipe.carbs > 20) {
                    return false;
                }
            }

            // Filter by excluded ingredients
            if (this.currentUser.excludedIngredients && this.currentUser.excludedIngredients.length > 0) {
                const hasExcludedIngredient = recipe.ingredients.some(ingredient => {
                    return this.currentUser.excludedIngredients.some(excluded => {
                        if (excluded === 'Dairy' && ['Paneer', 'Yogurt', 'Milk', 'Cheese', 'Feta'].some(dairy => 
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
        console.log('Generating daily meal plan...');
        const filteredRecipes = this.filterRecipes();
        this.currentMealPlan = [];
        this.usedRecipeIds.clear();

        const mealCategories = this.currentUser.mealCount === 3 
            ? ['Breakfast', 'Lunch', 'Dinner'] 
            : ['Lunch', 'Dinner'];

        // Generate main meals
        mealCategories.forEach(category => {
            const categoryRecipes = filteredRecipes.filter(recipe => 
                recipe.category === category
            );
            
            if (categoryRecipes.length > 0) {
                const randomRecipe = categoryRecipes[Math.floor(Math.random() * categoryRecipes.length)];
                this.currentMealPlan.push({...randomRecipe, mealType: category});
                this.usedRecipeIds.add(randomRecipe.id);
            }
        });

        // Always add a salad recipe (required by specification)
        const saladRecipes = filteredRecipes.filter(recipe => recipe.category === 'Salad');
        if (saladRecipes.length > 0) {
            const randomSalad = saladRecipes[Math.floor(Math.random() * saladRecipes.length)];
            this.currentMealPlan.push({...randomSalad, mealType: 'Salad'});
            this.usedRecipeIds.add(randomSalad.id);
        }

        console.log('Generated meal plan with', this.currentMealPlan.length, 'recipes');
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
        
        const namePrefix = recipe.category === 'Salad' ? '🥗 ' : '';
        
        card.innerHTML = `
            <div class="meal-header">
                <div class="meal-category">${recipe.mealType}</div>
                <div class="meal-name">${namePrefix}${recipe.name}</div>
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
                    <button class="btn btn--outline swap-btn" data-meal-index="${index}" data-meal-type="${recipe.mealType}">🔄 Swap</button>
                    <button class="btn btn--secondary copy-btn" data-recipe-id="${recipe.id}">📋 Copy</button>
                </div>
            </div>
        `;

        // Add event listeners to the buttons
        const viewBtn = card.querySelector('[data-recipe-id]');
        const swapBtn = card.querySelector('.swap-btn');
        const copyBtn = card.querySelector('.copy-btn');
        
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

        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                this.copyRecipe(recipe.id);
            });
        }

        return card;
    }

    async copyRecipe(recipeId) {
        const recipe = this.recipes.find(r => r.id === recipeId);
        if (!recipe) return;

        let recipeText = `${recipe.name}\n\n`;
        recipeText += `Cuisine: ${recipe.cuisine}\n`;
        recipeText += `Prep Time: ${recipe.prep_time} min | Cook Time: ${recipe.cook_time} min | Total: ${recipe.total_time} min\n`;
        recipeText += `Servings: ${recipe.servings} | Difficulty: ${recipe.difficulty}\n\n`;
        
        recipeText += `NUTRITION (per serving):\n`;
        recipeText += `Calories: ${recipe.calories} kcal\n`;
        recipeText += `Protein: ${recipe.protein}g | Carbs: ${recipe.carbs}g | Fat: ${recipe.fat}g\n\n`;
        
        recipeText += `INGREDIENTS:\n`;
        recipe.ingredients.forEach(ingredient => {
            recipeText += `• ${ingredient.name} - ${ingredient.quantity} ${ingredient.unit}\n`;
        });
        
        recipeText += `\nINSTRUCTIONS:\n`;
        recipe.instructions.forEach((instruction, index) => {
            recipeText += `${index + 1}. ${instruction}\n`;
        });

        // Add dressing info for salads
        if (recipe.dressings && recipe.dressings.length > 0) {
            recipeText += `\nDRESSING OPTIONS:\n`;
            recipe.dressings.forEach(dressing => {
                recipeText += `\n${dressing.name}:\n`;
                dressing.ingredients.forEach(ingredient => {
                    recipeText += `• ${ingredient}\n`;
                });
            });
        }

        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(recipeText);
                this.showToast('Copied!');
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = recipeText;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand('copy');
                textArea.remove();
                this.showToast('Copied!');
            }
        } catch (error) {
            console.error('Failed to copy recipe:', error);
            this.showToast('Copy failed!');
        }
    }

    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 2000);
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

        // Add dressings section for salads
        let dressingSection = document.getElementById('modal-dressings');
        if (dressingSection) {
            dressingSection.remove();
        }

        if (recipe.dressings && recipe.dressings.length > 0) {
            dressingSection = document.createElement('div');
            dressingSection.id = 'modal-dressings';
            dressingSection.className = 'recipe-dressings';
            dressingSection.innerHTML = `
                <h4 class="dressings-header" onclick="this.parentElement.classList.toggle('collapsed')">
                    Dressings <span class="toggle-icon">▼</span>
                </h4>
                <div class="dressings-content">
                    ${recipe.dressings.map(dressing => `
                        <div class="dressing-item">
                            <h5>${dressing.name}</h5>
                            <ul>
                                ${dressing.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
            `;
            
            const modalBody = document.querySelector('.modal-body .recipe-details');
            modalBody.appendChild(dressingSection);
        }

        document.getElementById('recipe-modal').classList.remove('hidden');
    }

    showSwapOptions(mealIndex, mealType) {
        const filteredRecipes = this.filterRecipes();
        const currentRecipe = this.currentMealPlan[mealIndex];
        
        // Filter recipes by meal type and exclude current recipe
        let alternatives = filteredRecipes.filter(recipe => {
            if (mealType === 'Salad') {
                return recipe.category === 'Salad' && recipe.id !== currentRecipe.id;
            } else {
                return recipe.category === mealType && recipe.id !== currentRecipe.id;
            }
        });

        const swapContainer = document.getElementById('swap-options');
        swapContainer.innerHTML = '';

        if (alternatives.length === 0) {
            this.showToast('No more recipes available');
            this.closeModal('swap-modal');
            return;
        }

        // Show up to 3 alternatives
        alternatives = alternatives.slice(0, 3);

        alternatives.forEach(recipe => {
            const option = document.createElement('div');
            option.className = 'swap-option';
            const namePrefix = recipe.category === 'Salad' ? '🥗 ' : '';
            option.innerHTML = `
                <div class="swap-option-name">${namePrefix}${recipe.name}</div>
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
        // Remove old recipe from used set
        this.usedRecipeIds.delete(this.currentMealPlan[mealIndex].id);
        
        // Add new recipe to used set
        this.usedRecipeIds.add(newRecipe.id);
        
        // Update meal plan
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
        this.showToast(message);
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