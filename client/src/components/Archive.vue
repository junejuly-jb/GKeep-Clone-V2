<template>
    <v-app>
            <masonry
                :cols="{default: 4, 1000: 3, 700: 2, 400: 1}"
                :gutter="{default: '30px', 700: '10px'}"
                >
                    <div v-for="(note, index) in myArchiveNotes" :key="index" class="mt-5">
                        <v-card outlined :color="note.color === 'default' ? '' : note.color">
                            <v-container>
                                <div class="float-right">
                                    <v-icon small>mdi-circle-outline</v-icon>
                                </div>
                                <div class="py-2"><h5>{{ note.title }}</h5></div>
                                <p>{{ note.content }}</p>
                                <div class="mt-3 mb-4">
                                    <v-chip
                                    class="mr-1"
                                    outlined
                                    v-for="(noteTags, i) in note.tags"
                                    :key="i" small
                                    >
                                    {{noteTags}}
                                    </v-chip>
                                </div>
                                <div class="d-flex">
                                    <div>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn x-small fab icon v-bind="attrs" v-on="on"><v-icon>mdi-tag-outline</v-icon></v-btn>
                                            </template>
                                            <span>Add tag</span>
                                        </v-tooltip>
                                    </div>
                                    <div>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn v-bind="attrs" v-on="on" fab icon x-small><v-icon>mdi-trash-can-outline</v-icon></v-btn>
                                            </template>
                                            <span>Delete</span>
                                        </v-tooltip>
                                    </div>
                                    <div>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn v-bind="attrs" v-on="on" fab icon x-small><v-icon>mdi-pencil-outline</v-icon></v-btn>
                                            </template>
                                            <span>Edit</span>
                                        </v-tooltip>
                                    </div>
                                    <div>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn v-bind="attrs" v-on="on" fab icon x-small><v-icon>mdi-archive-outline</v-icon></v-btn>
                                            </template>
                                            <span>Archive</span>
                                        </v-tooltip>
                                    </div>
                                </div>
                            </v-container>
                        </v-card>
                    </div>
            </masonry>
    </v-app>
</template>
<script>
export default {
    props: ['myArchiveNotes'],
    data: () => ({

    })
}
</script>