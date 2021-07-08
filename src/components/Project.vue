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
            <v-alert
            v-show="project.running"
            dense
            outlined
            text
            type="warning"
            class="alert-message">
            Test is currently running on the QA machine!
            </v-alert>
            <div>{{project.text}}</div>
        </v-card-text>
        
        <v-card-text class="timeline">
            <div class="font-weight-bold ml-8 mb-2">
                Browsers
            </div>
            <v-timeline                 
                dense
            >
                <v-timeline-item
                v-for="item in project.timeline"
                :key="item.from"
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
                :disabled="!runnable"
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
                            <div
                                v-for="browser in project.browsers"
                                :key="browser.time"   
                            >
                                <v-btn
                                    :color="browser.color"                            
                                    text
                                    :disabled="project.running"
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
    import { getProjects, runBat } from '../services/ProjectService'
    
    export default {
        name: 'Project',                
        data: () => ({
            hover: false,
            loading: false,
            selection: 1,
            snackbar: false,
            runnable: false,
            text: 'Sorry, this is not yet available',
            projects : 
            {
                "boem": 
                {
                    name: 'BOEM',
                    text: 'Outer Continental Shelf (OCS) Air Quality System',
                    report: false,
                    run: false,
                    running: false,
                    browsers:
                    {
                        "chrome": 
                        {
                            from: 'Chrome',                                    
                            color: 'light-blue lighten-1',
                            type: '1'
                        },
                        "firefox": 
                        {
                            from: 'Firefox',                        
                            color: 'orange',
                            type: '1',
                        }
                    },
                    otherOptions:
                    {
                        "508": {
                            from: '508',                        
                            color: 'green',
                            type: '2',
                        }
                    },
                    timeline: 
                    {
                        "chrome": 
                        {
                            from: 'Chrome',            
                            icon:'fab fa-chrome',
                            time: '07/04/2021',
                            color: 'light-blue lighten-1',
                        },
                        "firefox": 
                        {
                            from: 'Firefox',
                            icon:'fab fa-firefox-browser',
                            time: '05/12/2021',
                            color: 'orange',
                        },
                        "508": 
                        {
                            from: '508',
                            icon:'',
                            time: '01/29/2021',
                            color: 'green',
                        }
                    } 
                },
                "cosd": 
                {
                    name: 'COSD',
                    text: 'San Diego APCD - Emissions Inventory System (EIS)',
                    report: false,
                    run: false,
                    running: false,
                    browsers: 
                    {
                        "chrome":
                        {
                            from: 'Chrome',                                    
                            color: 'light-blue lighten-1',
                            type: '1',
                            },
                        "firefox":
                        {
                            from: 'Firefox',
                            color: 'orange',
                            type: '1',                                                
                        }
                    },                                                               
                    otherOptions:
                    {
                        "508":
                        {
                            from: '508',                        
                            color: 'green',
                            type: '2',
                            disabled: true
                        }
                    },
                    timeline: 
                    {
                        "chrome": 
                        {
                            from: 'Chrome',            
                            icon:'fab fa-chrome',
                            time: '05/21/2020',
                            color: 'light-blue lighten-1',
                        },
                        "firefox": 
                        {
                            from: 'Firefox',
                            icon:'fab fa-firefox-browser',
                            time: '04/01/2020',
                            color: 'orange',
                        },
                        "508": 
                        {
                            from: '508',
                            icon:'',
                            time: 'never',
                            color: 'green',
                        }
                    }            
                },
                "rtt": 
                {
                    name: 'RTT',
                    text: '',
                    report: false,
                    run: false,
                    running: false,
                    browsers: 
                    {
                        "chrome":
                        {
                            from: 'Chrome',                                    
                            color: 'light-blue lighten-1',
                            type: '1',
                            },
                        "firefox":
                        {
                            from: 'Firefox',
                            color: 'orange',
                            type: '1',                                                
                        }
                    },
                    timeline: 
                    {
                        "chrome": 
                        {
                            from: 'Chrome',            
                            icon:'fab fa-chrome',
                            time: 'never',
                            color: 'light-blue lighten-1',
                        },
                        "firefox": 
                        {
                            from: 'Firefox',
                            icon:'fab fa-firefox-browser',
                            time: 'never',
                            color: 'orange',
                        }
                    }            
                }   
            }            
        }),
        created() {
            getProjects().then(response => {
                    console.log(response)
                    this.projects = response? response : this.projects         
                    this.runnable = response? true : false           
            })
        },
        methods: {             
            runBat(project, browser) {
                this.projects[project].running = true;
                
                console.log(this.projects[project].running)
                const payload = {
                    project: project,
                    browser: browser                    
                }

                console.log('data:::', payload)

                runBat(payload).then(response => {
                    console.log(response);
                    
                    //Update project
                    getProjects().then(response => {
                        //console.log(response)
                        this.projects = response? response : this.projects       
                        console.log(response)
                        console.log(this.projects)
                        
                    }) 
                });
            },

            reserve (project, browser) {                       
                window.open(
                    'projects/'+project+'/'+browser+'/allure-report/index.html',
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

    .v-timeline {
        padding-top: 18px !important;
    }

    .v-timeline-item {
        padding-bottom: 20px !important;
    }

    .timeline{
        padding-top:0 !important;
        padding-bottom:0 !important;
    }

    .alert-message{
        font-size:12px !important;
    }
</style>