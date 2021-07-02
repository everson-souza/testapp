<template>
   <v-container>
    <v-row justify="space-around">
      <v-col 
        cols="12"        
        xs="12"
        sm="6"
        md="4"
        lg="4"
        xl="6"
        v-for="project in projects"
        :key="project.name"  
      >   
        <v-card
        :loading="loading"
        class="mx-auto my-12"
        max-width="400"
        elevation="5"
        >
        <template slot="progress">
            <v-progress-linear
            color="green"
            height="5"
            indeterminate
            ></v-progress-linear>
        </template>
    
        <v-card-title>
           {{project.name}}            
        </v-card-title>
    
        <v-card-text>
            <div>{{project.text}}</div>
        </v-card-text>
        
        <v-card-text>
            <div class="font-weight-bold ml-8 mb-2">
                Browsers
            </div>
            <v-timeline                
                dense
            >
                <v-timeline-item
                v-for="item in project.timeline"
                :key="item.time"
                :color="item.color"    
                class="browser"            
                small
                >
                <template v-slot:icon>
                <i :class="item.icon"></i>
                </template>
                <div>
                    <div class="font-weight-normal">
                    <strong>{{ item.from }}</strong> 
                    </div>
                    <div>Latest run was @ {{ item.time }}</div>
                </div>
                </v-timeline-item>
            </v-timeline>
        </v-card-text> 
        <v-card-actions>   
            <v-btn  
                class="ma-2"    
                color="error"
                text
                @click.stop="project.run = true"> 
                New run

                <v-dialog
                    v-model="project.run"
                    max-width="400"
                >
                    <v-card>
                        <v-card-title>
                            {{project.name}}
                        </v-card-title>

                        <v-card-text>
                            Select an option to <b>generate a new report</b>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <div
                                v-for="browser in project.browsers"
                                :key="browser.time"   
                            >
                                <v-btn
                                    :color="browser.color"                            
                                    text
                                    @click="runBat(project.name.toLowerCase(), browser.from.toLowerCase())"
                                >
                                    {{browser.from}}
                                </v-btn>
                            </div>
                            <v-btn
                                v-for="option in project.otherOptions"
                                :key="option.time"   
                                :color="option.color"                                
                                text
                                :disabled="option.disabled"
                                @click="download(project.name.toLowerCase())">
                                {{option.from}}             
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-btn>

            <v-btn  
                class="ma-2"
                color="primary"
                @click.stop="project.report = true">
                Latest reports

                <v-dialog
                    v-model="project.report"
                    max-width="400"
                >
                    <v-card>
                        <v-card-title>
                            {{project.name}}
                        </v-card-title>

                        <v-card-text>
                            Select an option to <b>get the last</b> generated report
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <div
                                v-for="browser in project.browsers"
                                :key="browser.time"   
                            >
                                <v-btn
                                    :color="browser.color"                            
                                    text
                                    @click="reserve(project.name.toLowerCase(), browser.from.toLowerCase())"
                                >
                                    {{browser.from}}
                                </v-btn>                                
                            </div>
                            <v-btn
                                v-for="option in project.otherOptions"
                                :key="option.time"   
                                :color="option.color"                                
                                text
                                :disabled="option.disabled"
                                @click="download(project.name.toLowerCase())">
                                {{option.from}}             
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-btn>
        </v-card-actions>
        </v-card>        
    </v-col>    
    </v-row>    
    
  </v-container>
</template>

<script>
    import axios from "axios";    
    import configFile from '../tests.json'
    import { getProjects, runBat } from '../services/ProjectService'

    export default {
        name: 'Project',                
        data: () => ({
            hover: false,
            loading: false,
            selection: 1,
            snackbar: false,
            text: 'Sorry, this is not yet available',
            projects: [],
            
        }),
        created() {
            getProjects().then(response => {
                    console.log(response)
                    this.projects = response                    
            })
        },
        methods: {             
            runBat(project, browser) {
                const payload = {
                    project: project,
                    browser: browser                    
                }

                console.log('data:::', payload)

                runBat(payload).then(response => {
                    console.log(response); 
                });
            },

            reserve (project, browser) {                       
                window.open(
                    'projects/'+project+'/'+browser+'/allure-report/index.html',
                    '_blank' // <- This is what makes it open in a new window.
                );                 
            },

            downloadImages (project, browser) {                        
                window.open(
                    './../projects/'+project+'/'+browser+'/test-images.zip',
                    '_blank' // <- This is what makes it open in a new window.
                );        
            },

            download(project){                                                                
                try{                    
                    window.open(
                        './../projects/'+project+'/508/508.zip',
                        '_blank' // <- This is what makes it open in a new window.
                    );
                }catch(err){
                    console.log("erro");
                }                
            }

        }  
    }
</script>  
<style> 
    a {
        color: '';
        text-decoration: none;
    }   
</style>