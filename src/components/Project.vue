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
    
        <v-card-title>{{project.name}}</v-card-title>
    
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
        <div
            v-for="browser in project.browsers"
            :key="browser.time"   
        >
                <v-btn
                    :color="browser.color"                                
                    text
                    :disabled="browser.disabled"                
                    @click.stop="browser.dialog = true"                    
                    >
                    {{browser.from}} 
                    </v-btn>

                    <v-dialog
                    v-model="browser.dialog"
                    max-width="400"
                    >
                    <v-card>
                        <v-card-title class="headline">
                            {{browser.from}}
                        </v-card-title>

                        <v-card-text>
                            What you wanna do?
                        </v-card-text>

                        <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn
                            :color="browser.color"
                            text
                            @click="reserve(project.name.toLowerCase(), browser.from.toLowerCase())"
                        >
                            Allure reports
                        </v-btn>

                        <v-btn
                            :color="browser.color"
                            text
                            @click="downloadImages(project.name.toLowerCase(), browser.from.toLowerCase())"
                        >
                            Test images
                        </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>            
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
    </v-col>    
    </v-row>    
    
  </v-container>
</template>

<script>
    import axios from "axios";    
    import configFile from '../tests.json'

    export default {
        name: 'Project',                
        data: () => ({
            hover: false,
            loading: false,
            selection: 1,
            snackbar: false,
            text: 'Sorry, this is not yet available',
            projects: [
                {
                    name: 'BOEM',
                    text: 'Outer Continental Shelf (OCS) Air Quality System',
                    browsers: [
                        {
                        from: 'Chrome',                                    
                        color: 'light-blue lighten-1',
                        type: '1',
                        dialog: false,
                        },
                        {
                        from: 'Firefox',                        
                        color: 'orange',
                        type: '1',
                        dialog: false,
                        }
                        
                    ],
                    otherOptions: [
                        {
                        from: '508',                        
                        color: 'green',
                        type: '2',
                        }
                    ],
                    timeline: [
                        {
                        from: 'Chrome',            
                        icon:'fab fa-chrome',
                        time: '03:43pm 03/11/2021',
                        color: 'light-blue lighten-1',
                        },
                        {
                        from: 'Firefox',
                        icon:'fab fa-firefox-browser',
                        time: '7:56am 03/23/2021',
                        color: 'orange',
                        },
                        {
                        from: '508',
                        icon:'',
                        time: '02:52pm 01/29/2021',
                        color: 'green',
                        }
                    ]
                },  
                {
                    name: 'COSD',
                    text: 'San Diego APCD - Emissions Inventory System (EIS)',
                    browsers: [
                        {
                        from: 'Chrome',                                    
                        color: 'light-blue lighten-1',
                        type: '1',
                        dialog: false,
                        },
                        {
                        from: 'Firefox',
                        color: 'orange',
                        type: '1',                        
                        disabled: true,
                        dialog: false,
                        },                                                               
                    ],
                    otherOptions: [
                        {
                        from: '508',                        
                        color: 'green',
                        type: '2',
                        disabled: true
                        },
                    ],
                    timeline: [
                        {
                        from: 'Chrome',            
                        icon:'fab fa-chrome',
                        time: '00:55am 10/28/2020',
                        color: 'light-blue lighten-1',
                        },
                        {
                        from: 'Firefox',
                        icon:'fab fa-firefox-browser',
                        time: '',
                        color: 'orange',
                        },
                        {
                        from: '508',
                        icon:'',
                        time: '',
                        color: 'green',
                        }
                    ]
                }                  
            ],
            
        }),
        methods: {                        
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