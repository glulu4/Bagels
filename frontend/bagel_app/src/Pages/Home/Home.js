// import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';

import React, { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import gsap from 'gsap';

import Timer from './Timer.js'
import styles from './Home.module.css'; 
import { isMobile } from 'react-device-detect';



function Home(){
    const navigate = useNavigate();
    const location = useLocation();

    useEffect( () => {


        /**
         * Base
         */
        // Canvas
        // const canvas = document.querySelector(`.${styles.webgl}`)

        const canvas = document.getElementById('canvas')

        

        /**
         * Loaders
         */
        //const loadingBarElement = document.querySelector('.loading-bar')
        // const bodyElement = document.querySelector('body')
        const loadingManager = new THREE.LoadingManager(
            () => {
                window.setTimeout(() => {
                    gsap.to(overlayMaterial.uniforms.uAlpha, {
                        duration: 1,
                        value: 0,
                        delay: 1
                    })
                    gsap.to(overlayMaterial.uniforms.uAlpha, {
                        duration: 3,
                        value: 0,
                        delay: 1
                    })

                    //loadingBarElement.classList.add('ended')
                    // bodyElement.classList.add('loaded')
                    //loadingBarElement.style.transform = ''

                }, 500)
            },
            (itemUrl, itemsLoaded, itemsTotal) => {
                console.log(itemUrl, itemsLoaded, itemsTotal)
                // const progressRatio = itemsLoaded / itemsTotal
                //loadingBarElement.style.transform = `scaleX(${progressRatio})`
                // console.log(progressRatio)
            },
            () => {

            }
        )
        const gltfLoader = new GLTFLoader(loadingManager) // used to be         const gltfLoader = new THREE.GLTFLoader(loadingManager)


        /**
         *  Textures
         */
        const textureLoader = new THREE.TextureLoader()
        const alphaShadow = textureLoader.load('/assets/texture/simpleShadow.jpg');

        // Scene
        const scene = new THREE.Scene()

        const sphereShadow = new THREE.Mesh(
            new THREE.PlaneGeometry(1.5, 1.5),
            new THREE.MeshBasicMaterial({
                transparent: true,
                color: 0x000000,
                opacity: 0.5,
                alphaMap: alphaShadow
            })
        )

        sphereShadow.rotation.x = -Math.PI * 0.5

        sphereShadow.position.y = -1
        sphereShadow.position.x = 1.5;

        scene.add(sphereShadow)

        /**
         * Overlay
         */
        const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
        const overlayMaterial = new THREE.ShaderMaterial({
            vertexShader: `
        void main() {
            gl_Position = vec4(position, 1.0);
        }
    `,
            fragmentShader: `
        uniform float uAlpha;
        void main() {
            gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
            // gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        }
    `,
            uniforms: {
                uAlpha: {
                    value: 1.0
                }
            },
            transparent: true
        })
        const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial);
        scene.add(overlay)


        /**
         * GLTF Model
         */
        let donut = null

        gltfLoader.load(
            './assets/everything_bagel/scene.gltf',
            (gltf) => {
                console.log(gltf);

                donut = gltf.scene

                const radius = 0.8

                donut.position.x = 1.5;

                donut.rotation.x = Math.PI * 0.2
                donut.rotation.z = Math.PI * 0.15

                // adjusting the scale of the bagel if im on mobile

                const scale = isMobile ? 0.6 : 1.0; 

                donut.scale.set(radius * scale, radius * scale, radius * scale);
                scene.add(donut)
            },
            (progress) => {
                console.log(progress);
            },
            (error) => {
                console.error(error);
            }
        )

        /**
         * Light
         */
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
        scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
        directionalLight.position.set(1, 2, 0)

        directionalLight.castShadow = true
        scene.add(directionalLight)

        /**
         * Sizes
         */
        const sizes = isMobile
            ? {
                width: window.screen.width,
                height: window.screen.height
            }
            : {
                width: window.innerWidth,
                height: window.innerHeight
            };

        /**
         * Scroll
         */
        let scrollY = window.scrollY
        let currentSection = 0

        const transformDonut = [{
            rotationZ: 0.45,
            positionX: 1.5
        },
        {
            rotationZ: -0.45,
            positionX: -1.5
        },
        {
            rotationZ: 0.0314,
            positionX: 0
        },
        {
            rotationZ: 0.0314,
            positionX: 0.1
        },
        ]

        window.addEventListener('scroll', () => {

            scrollY = window.scrollY
            const newSection = Math.round(scrollY / sizes.height)

            console.log(newSection);

            if (newSection !== currentSection) {
                currentSection = newSection

                if (!!donut) {
                    gsap.to(
                        donut.rotation, {
                        duration: 1.5,
                        ease: 'power2.inOut',
                        z: transformDonut[currentSection].rotationZ
                    }
                    )
                    gsap.to(
                        donut.position, {
                        duration: 1.5,
                        ease: 'power2.inOut',
                        x: transformDonut[currentSection].positionX
                    }
                    )

                    gsap.to(
                        sphereShadow.position, {
                        duration: 1.5,
                        ease: 'power2.inOut',
                        x: transformDonut[currentSection].positionX - 0.2
                    }
                    )
                }
            }
        })

        /**
         * Camera
         */
        // Base camera
        const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 1000)
        camera.position.z = 5

        scene.add(camera)

        /**
         * Renderer
         */
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true
        })
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        /**
         * Animate
         */
        const clock = new THREE.Clock()
        // let lastElapsedTime = 0

        const tick = () => {
            const elapsedTime = clock.getElapsedTime()
            // const deltaTime = elapsedTime - lastElapsedTime
            // lastElapsedTime = elapsedTime

            if (!!donut) {
                donut.position.y = Math.sin(elapsedTime * .5) * .1 - 0.1
                sphereShadow.material.opacity = (1 - Math.abs(donut.position.y)) * 0.3
            }

            // Render
            renderer.render(scene, camera)

            // Call tick again on the next frame
            window.requestAnimationFrame(tick)
        }

        tick()

        /**
         * On Reload
         */
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        }



        return () => {
            // Clean up code goes here
        };

    }, [])
    const handleClick = () => {
        if (location.state) {
            const { _cost, _name, _email, _numPlain, _numSeseme, _numEv, _numPoppy, _numCinSug, _numCreamBagels, _numBagels } = location.state;
            navigate('/order', {
                state: {
                    _cost: _cost,
                    _name: _name,
                    _email: _email,
                    _numPlain: _numPlain,
                    _numSeseme: _numSeseme,
                    _numEv: _numEv,
                    _numPoppy: _numPoppy,
                    _numCinSug: _numCinSug,
                    _numCreamBagels: _numCreamBagels,
                    _numBagels: _numBagels
                }
            });
        }
        else {
            navigate('/order')

        }
    }

    return (

        <div className='homePage'>
            <canvas id='canvas' className={`${styles.webgl} homePage`} style={{ pointerEvents: 'none' }}></canvas>
            {/* <div className={styles.loading-bar}></div> */}

            <section className={styles.one}>
                <div className={styles.container}>
                    <div className={styles.hero}>
                        <h2 id='homePageh2'>Shmuel's Bagels</h2>
                        <h3 className='homePage'>Locally baked in Pittsburgh  <h3 style={{ fontSize: isMobile ? '25px' : '45px', fontWeight:'400' }}>kosher sourdough vegan</h3></h3>
                       


                    </div>
                </div>
            </section>

            <section className={styles.two}>
                <div className={styles.container}>
    
                    <Timer></Timer>

                </div>
            </section>

            <section className={styles.three}>
                <div style={{
                    width:"50%"
                }}>
                    <a onClick={handleClick} href={`${window.location.origin}/order`}>
                        <h1 className={`${styles['order-btn']} homePage`}>order now </h1>

                    </a>
                </div>

                
            </section>


            
            

            
            


        </div>






    );

    
}

export default Home;