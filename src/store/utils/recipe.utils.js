const URL = process.env.VUE_APP_API

// ============================== Dependencies ================================

export const adminAllRecipes = URL + '/api/recipe/all'
export const adminRecipe = (id) => URL + '/api/recipe/' + id
export const adminCreateRecipe = URL + '/api/recipe/admin/create'
export const adminDeleteRecipe = (id) => URL + '/api/recipe/' + id

// ============================================================================

export const notifications = [
    {
        username: 'andrii123',
        message: 'submited a new recipe',
        date: '2020-01-01',
        id: 1,
    },
    {
        username: 'hesoyam',
        message: 'submited a new recipe',
        date: '2020-01-01',
        id: 2,
    },
    {
        username: 'baguvix',
        message: 'submited a new recipe',
        date: '2020-01-01',
    },
    {
        username: 'TonyStark',
        message: 'submited a new recipe',
        date: '2020-01-01',
    },
    {
        username: 'John Wick',
        message: 'submited a new recipe',
        date: '2020-01-01',
    },
]
