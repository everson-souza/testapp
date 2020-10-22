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
        <v-snackbar
            v-model="snackbar"
            :timeout="2000"
            >
            {{ text }}

            <template v-slot:action="{ attrs }">
                <v-btn
                color="pink"
                text
                v-bind="attrs"
                @click="snackbar = false"
                >
                Close
                </v-btn>
            </template>
            </v-snackbar>
    </v-col>    
    </v-row>    
    
  </v-container>
</template>

<script>
    import axios from "axios";    

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
                        icon:'fab fa-chrome',
                        time: '10:42am 19/10/2020',
                        color: 'light-blue lighten-1',
                        type: '1',
                        },
                        {
                        from: 'Firefox',
                        icon:'fab fa-firefox-browser',
                        time: '10:36am 19/10/2020',
                        color: 'orange',
                        type: '1',
                        },
                        {
                        from: '508',
                        icon:'',
                        time: '10:39am 19/10/2020',
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
                        type: '1',
                        },
                        {
                        from: 'Firefox',
                        icon:'fab fa-firefox-browser',
                        time: '10:37am 19/10/2020',
                        color: 'orange',
                        type: '1',
                        //disabled: true,
                        },
                        {
                        from: '508',
                        icon:'',
                        time: '10:38am 19/10/2020',
                        color: 'green',
                        type: '2',
                        disabled: true
                        }                
                    ],
                }  
            ],
        }),
        methods: {
            async reserve (project, browser) {        

                
                axios
                    .get('/projects/'+project+'/'+browser+'/allure-report/index.html')
                    .then(response => {       
                        let js = JSON.parse(JSON.stringify(response.headers));
                        console.log(js);
                        window.open(
                            'projects/'+project+'/'+browser+'/allure-report/index.html',
                            '_blank' // <- This is what makes it open in a new window.
                        )
                    })
                    .catch(error => {
                        this.snackbar=true;
                        console.log('./../../public/projects/'+project+'/'+browser+'/allure-report/index.html');
                    })
            // reserve (project, browser) {
                
            //     window.open(
            //         'projects/'+project+'/'+browser+'/allure-report/index.html',
            //         '_blank' // <- This is what makes it open in a new window.
            //     );  
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