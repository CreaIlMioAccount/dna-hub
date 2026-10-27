const supabaseUrl =
'https://xxqfbgwkwopffzdztljs.supabase.co';

const supabaseKey =
'sb_publishable_Fa6DQbBzK0Imej5c6fmjMg_cq36AXhn';

const client =
supabase.createClient(
    supabaseUrl,
    supabaseKey
);

async function caricaRegistry() {

    const { data, error } = await client
        .from('dna_registry')
        .select('*')
        .order('code');

    console.log('DATA:', data);
    console.log('ERROR:', error);

    if (error) {
        console.error(error);
        return;
    }

    const table =
    document.getElementById('registryTable');

    table.innerHTML = '';

    data.forEach(item => {

        table.innerHTML += `
        <tr>
            <td>${item.code ?? ''}</td>
            <td>${item.titolo ?? ''}</td>
            <td>${item.ecosistema ?? ''}</td>
            <td>${item.classificazione ?? ''}</td>
            <td>${item.stato ?? ''}</td>
        </tr>
        `;
    });
}

caricaRegistry();