<template>
   <v-container>
    <v-row justify="space-around">
      <v-col cols="3">   
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
    
        <v-card-title>BOEM</v-card-title>
    
        <v-card-text>
            <div>Outer Continental Shelf (OCS) Air Quality System</div>
        </v-card-text>
        
        <v-card-text>
            <div class="font-weight-bold ml-8 mb-2">
                Browsers
            </div>
            <v-timeline                
                dense
            >
                <v-timeline-item
                v-for="message in messages"
                :key="message.time"
                :color="message.color"    
                class="browser"            
                small
                >
                <template v-slot:icon>
                <i :class="message.icon"></i>
                </template>
                <div>
                    <div class="font-weight-normal">
                    <strong>{{ message.from }}</strong> 
                    </div>
                    <div>Latest run was @ {{ message.time }}</div>
                </div>
                </v-timeline-item>
            </v-timeline>
        </v-card-text> 
        <v-card-actions>
            <a 
                v-for="message in messages"
                :key="message.time"                
                target="_blank" :href="'projects/boem/'+message.from+'/allure-report/index.html'">
            <v-btn
                :color="message.color"                                
                text
                @click="reserve">
                {{message.from}}             
            </v-btn>
            </a>
            
            <v-btn                
                text
                color="green"
                @click="reserve"
            >
            508                
            </v-btn>
        
        </v-card-actions>
        </v-card>
    </v-col>
    <v-col cols="3">   
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
    
        <v-card-title>COSD</v-card-title>
        <v-card-text>
            <div>San Diego APCD - Emissions Inventory System (EIS)</div>
        </v-card-text>
        <v-card-text>
            <div class="font-weight-bold ml-8 mb-2">
                Browsers                
            </div>
            
            <v-timeline                
                dense
            >
                <v-timeline-item
                v-for="message in messages"
                :key="message.time"
                :color="message.color"                
                class="browser"
                small
                >
                <template v-slot:icon>
                <i :class="message.icon"></i>
                </template>
                <div>                  
                    <div class="font-weight-normal">
                    <strong>{{ message.from }}</strong> 
                    </div>
                    <div>Latest run was @ {{ message.time }}</div>
                </div>
                </v-timeline-item>
            </v-timeline>
        </v-card-text>    
        <v-card-actions>
            <a 
                v-for="message in messages"
                :key="message.time"                
                target="_blank" :href="'projects/cosd/'+message.from+'/allure-report/index.html'">
                <v-btn
                    :color="message.color"                                
                    text
                    @click="reserve">
                    {{message.from}}             
                </v-btn>
            </a>
            
            <v-btn                
                text
                color="green"
                @click="download"
            >
            508                
            </v-btn>
        
        </v-card-actions>
        </v-card>
    </v-col>
    <v-col cols="3">
    </v-col>
    <v-col cols="3">
    </v-col>
    
    </v-row>    
    
  </v-container>
</template>

<script>
    import JSZip from 'jszip'
    export default {
        name: 'Project',
        data: () => ({
            hover: false,
            loading: false,
            selection: 1,
            
            
            messages: [
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
                }                
            ],
        }),
        methods: {
            reserve () {                
                this.loading = true                
                setTimeout(() => (this.loading = false), 2000)
            },
            download(){
               
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