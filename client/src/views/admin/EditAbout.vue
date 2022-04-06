<template>
<div class="modal is-active">
    <div class="modal-background" @click="close()"></div>
    <div class="modal-content">
    
        <form class="box" @submit.prevent="editAbout">

        <div class="field" v-show="aboutItem.number==1">
            <label class="label">Description</label>
            <div class="control">
                <textarea class="textarea is-warning" type="text" placeholder="Message in Home Page" v-model="description"></textarea>
            </div>
        </div>

        <div class="field" v-show="aboutItem.number==2">
            <label class="label">About</label>
            <div class="control">
                <textarea class="textarea is-warning" type="text" placeholder="About description" v-model="aboutDesc"></textarea>
            </div>
        </div>

        <div class="field" v-show="aboutItem.number==3">
            <label class="label">Opening Hours</label>
            <div class="control">
                <textarea class="textarea is-warning" type="text" placeholder="Mon-Fri: 8:30AM - 9:30PM&#10;Sat: 8:30AM - 5PM&#10;Sun: CLOSED" v-model="openingHours"></textarea>
            </div>
        </div>

        <div class="field" v-show="aboutItem.number==4">
            <label class="label">Address</label>
            <div class="control">
                <textarea class="textarea is-warning" type="text" placeholder="50 Nanyang Ave, 639798 Singapore" v-model="address"></textarea>
            </div>
        </div>

        <div class="field" v-show="aboutItem.number==5">
            <label class="label">How to Get Here?</label>
            <div class="control">
                <textarea class="textarea is-warning" rows="10" type="text" placeholder="By Car: The university is flanked by the PIE to the south and Jalan Bahar to the east. There are two entrances when travelling via the PIE, take either the Jalan Bahar entrance (Exit 36) or the Pioneer North entrance (Exit 38).&#10;By Bus: Service 179 & 199: Both services depart from Boon Lay Bus Interchange (next to Boon Lay MRT Station) to the University. The services ply from 0600-2400 hrs on weekdays and Saturdays, and from 0630-0020hrs on Sundays and Public Holidays.&#10;By NTU Shuttle Bus Service: Campus Rider is a free shuttle bus service to and from Pioneer MRT station." v-model="getHere"></textarea>
            </div>
        </div>

        <div class="field" v-show="aboutItem.number==6">
            <label class="label">Image</label>
            <div class="control">
                <!-- <input class="input" type="text" placeholder="Paste image address" v-model="imageLink"> -->
                <span class="file-cta" @click="onFileSelected">
                    <span class="file-icon"><fa icon="upload"/></span>
                    <span class="file-label">Upload image</span>
                </span>
            </div>
            <div class="my-3" v-if="thumbnailLink"><img :src="thumbnailLink"></div>
        </div>

        <button type="submit" class="button is-outlined is-fullwidth">
            Update
        </button>

        </form>

    </div>
    <button class="modal-close is-large" aria-label="close" @click="close()"></button>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            description: this.description,
            aboutDesc: this.aboutDesc,
            openingHours: this.openingHours,
            address: this.address,
            getHere: this.getHere,
            imageLink: this.imageLink,
            thumbnailLink: ''
        }
    },
    computed: {
        ...mapGetters(['about', 'aboutStatus'])
    },
    props: ['aboutItem'],
    methods: {
        ...mapActions(['updateAbout']),
        close() {
            this.$emit('close')
        },
        onFileSelected() {
            window.cloudinary.openUploadWidget({ 
                cloud_name: 'eeelifelonglearning',
                upload_preset: 'ml_default'
            }, (error, result) => {
                if (!error && result && result.event === "success") {
                    console.log('Done uploading..: ', result.info);
                    this.thumbnailLink = result.info.thumbnail_url
                    this.imageLink = result.info.url
                }
            }).open();
        },
        editAbout() {
            if (this.openingHours) {
                let tempHours = this.openingHours.split('\n')
                this.openingHours = {}
                for (let i=0; i<tempHours.length; i++) {
                    let str = tempHours[i]
                    this.openingHours[str.substr(0, str.indexOf(':'))] = str.substr(str.indexOf(':') + 2);
                }
            }

            if (this.getHere) {
                let tempHere = this.getHere.split('\n')
                this.getHere = {}
                for (let i=0; i<tempHere.length; i++) {
                    let str = tempHere[i]
                    this.getHere[str.substr(0, str.indexOf(':'))] = str.substr(str.indexOf(':') + 2);
                }
            }

            let about = {
                description: this.description,
                aboutDesc: this.aboutDesc,
                openingHours: this.openingHours,
                address: this.address,
                getHere: this.getHere,
                imageLink: this.imageLink
            }
            this.updateAbout(about).then(() => {
                if (this.aboutStatus.update == 'success') {
                    window.location.reload()
                } else {
                    this.close()
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style scoped>
.box {
    padding: 2rem 3rem;
}

.modal-content {
    min-width: 55vw;
}

.button {
    color: black;
}
</style>
