<template>
   <v-container>
    <v-row justify="space-around">
      <v-col 
        cols="3"
        v-for="project in projects"
        :key="project.name"  
      >   
        <v-card
        :loading="loading"
        class="mx-auto my-12"
        max-width="300"
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
                v-for="browser in project.browsers"
                :key="browser.time"
                :color="browser.color"    
                class="browser"            
                small
                >
                <template v-slot:icon>
                <i :class="browser.icon"></i>
                </template>
                <div>
                    <div class="font-weight-normal">
                    <strong>{{ browser.from }}</strong> 
                    </div>
                    <div>Latest run was @ {{ browser.time }}</div>
                </div>
                </v-timeline-item>
            </v-timeline>
        </v-card-text> 
        <v-card-actions>            
            <v-btn
                v-for="browser in project.browsers"
                :key="browser.time"   
                :color="browser.color"                                
                text
                :disabled="browser.disabled"
                @click="browser.type == '1' ? (reserve(project.name.toLowerCase(), browser.from.toLowerCase())) : (download(project.name.toLowerCase()))">
                {{browser.from}}             
            </v-btn>           
            
        </v-card-actions>
        </v-card>
    </v-col>    
    </v-row>    
    
  </v-container>
</template>

<script>
    
    export default {
        name: 'Project',                
        data: () => ({
            hover: false,
            loading: false,
            selection: 1,
                        
            projects: [
                {
                    name: 'BOEM',
                    text: 'Outer Continental Shelf (OCS) Air Quality System',
                    browsers: [
                        {
                        from: 'Chrome',            
                        icon:'fab fa-chrome',
                        time: '10:42am 19/10/2020',
                        color: 'light-blue lighten-1',
                        type: '1',
                        },
                        {
                        from: 'Firefox',
                        icon:'fab fa-firefox-browser',
                        time: '10:37am 19/10/2020',
                        color: 'orange',
                        type: '1',
                        },
                        {
                        from: '508',
                        icon:'',
                        time: '10:37am 19/10/2020',
                        color: 'green',
                        type: '2',
                        }
                    ],
                },  
                {
                    name: 'COSD',
                    text: 'San Diego APCD - Emissions Inventory System (EIS)',
                    browsers: [
                        {
                        from: 'Chrome',            
                        icon:'fab fa-chrome',
                        time: '10:42am 19/10/2020',
                        color: 'light-blue lighten-1',
                        },
                        {
                        from: 'Firefox',
                        icon:'fab fa-firefox-browser',
                        time: '10:37am 19/10/2020',
                        color: 'orange',
                        disabled: true,
                        },
                        {
                        from: '508',
                        icon:'',
                        time: '10:37am 19/10/2020',
                        color: 'green',
                        type: '2',
                        disabled: true
                        }                
                    ],
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
        },          
    }
</script>  
<style> 
    a {
        color: '';
        text-decoration: none;
    }   
</style>